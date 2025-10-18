import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ======================
// UI
// ======================
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

// ======================
// VALIDACIÓN (mínima)
// ======================
const validationSchema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio").min(2).max(50),
  apellido: yup.string().required("El apellido es obligatorio").min(2).max(50),
  dni: yup
    .string()
    .required("El DNI es obligatorio")
    .matches(/^\d{7,8}$/, "El DNI debe tener entre 7 y 8 dígitos"),
  telefono: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^[\d\s()+-]{6,20}$/, "Ingresá un teléfono válido"),
  email: yup.string().required("El email es obligatorio").email("Email inválido"),
});

// ======================
// HELPERS
// ======================
const toNumber = (v) => {
  if (v === null || v === undefined || v === "") return 0;
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const formatARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(toNumber(n));

// Normaliza un item del carrito a un esquema consistente
const normalizeItem = (raw) => {
  const qtyRaw = raw.cantidad ?? raw.quantity;
  return {
    id: raw.id,
    nombre: raw.nombre ?? raw.title ?? "",
    descripcion: raw.descripcion ?? raw.description ?? "",
    imagen: raw.imagen ?? raw.image ?? "",
    precio: toNumber(raw.precio ?? raw.price),
    cantidad: toNumber(qtyRaw ?? 1),
  };
};


// ======================
// COMPONENTE
// ======================
/**
 * Props:
 * - carrito: Array de items (pueden venir con keys de tu contexto: title/image/price/quantity)
 * - crearPreferenciaPago?: (payload) => Promise<{ initPoint: string }>
 * - onVolver?: () => void
 */
const FormularioCompra = ({ carrito = [], crearPreferenciaPago, onVolver }) => {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgOk, setMsgOk] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
    },
  });

  // Normalizá todo el carrito una sola vez
  const cart = useMemo(() => (Array.isArray(carrito) ? carrito.map(normalizeItem) : []), [carrito]);

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [cart]
  );

  const itemsMP = useMemo(
    () =>
      cart.map((item) => ({
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: item.precio,
      })),
    [cart]
  );

  const onSubmit = async (data) => {
    if (!cart.length) {
      setMsgError("No hay productos en el carrito.");
      return;
    }
    if (!crearPreferenciaPago) {
      setMsgError("Falta la función crearPreferenciaPago en CheckoutPage.");
      return;
    }

    setLoading(true);
    setMsgError("");
    setMsgOk("");

    try {
      localStorage.setItem("carrito_actual", JSON.stringify(cart));
      localStorage.setItem(
        "comprador_actual",
        JSON.stringify({
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          telefono: data.telefono,
          email: data.email,
        })
      );

      const { initPoint } = await crearPreferenciaPago({
        payer: { email: data.email },
        items: itemsMP,
        metadata: {
          dni: data.dni,
          telefono: data.telefono,
          nombre: data.nombre,
          apellido: data.apellido,
          total,
        },
      });

      if (!initPoint) throw new Error("No se pudo obtener el initPoint de MercadoPago");
      window.location.href = initPoint;
    } catch (err) {
      console.error(err);
      setMsgError(err?.message || "Error al procesar el pago. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledPaper elevation={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4" color="primary">
              Finalizar compra
            </Typography>
            {!!onVolver && (
              <Button variant="outlined" onClick={onVolver} disabled={loading}>
                Volver
              </Button>
            )}
          </Box>

          {!!msgError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {msgError}
            </Alert>
          )}
          {!!msgOk && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {msgOk}
            </Alert>
          )}

          {/* Datos del Comprador */}
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
            Datos del comprador
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre"
                    fullWidth
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="apellido"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Apellido"
                    fullWidth
                    error={!!errors.apellido}
                    helperText={errors.apellido?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="dni"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="DNI"
                    fullWidth
                    error={!!errors.dni}
                    helperText={errors.dni?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Teléfono"
                    fullWidth
                    error={!!errors.telefono}
                    helperText={errors.telefono?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Resumen del Carrito */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Resumen del carrito
          </Typography>

          {cart.length ? (
            <>
              {cart.map((p) => {
                const subtotal = p.precio * p.cantidad;
                return (
                  <Card key={p.id ?? `${p.nombre}-${p.precio}`} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        {!!p.imagen && (
                          <Grid item xs={12} sm={2}>
                            <img
                              src={p.imagen}
                              alt={p.nombre}
                              style={{
                                width: "100%",
                                maxWidth: 80,
                                height: "auto",
                                objectFit: "contain",
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item xs={12} sm={p.imagen ? 4 : 6}>
                          <Typography variant="subtitle1">{p.nombre}</Typography>
                          {!!p.descripcion && (
                            <Typography variant="body2" color="text.secondary">
                              {p.descripcion}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={6} sm={2} textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Cantidad
                          </Typography>
                          <Typography variant="body1">{p.cantidad}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={2} textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Precio unitario
                          </Typography>
                          <Typography variant="body1">{formatARS(p.precio)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2} textAlign="right">
                          <Typography variant="body2" color="text.secondary">
                            Subtotal
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {formatARS(subtotal)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6">Total a pagar</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {formatARS(total)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <Typography variant="subtitle1" color="error" align="center">
              No hay productos en el carrito
            </Typography>
          )}

          {/* Acciones */}
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            {!!onVolver && (
              <Button variant="outlined" onClick={onVolver} disabled={loading}>
                Volver al carrito
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading || !cart.length}
              sx={{ ml: "auto", minWidth: 220 }}
            >
              {loading ? "Procesando..." : "Pagar con MercadoPago"}
            </Button>
          </Box>
        </StyledPaper>
      </form>
    </Container>
  );
};

export default FormularioCompra;
