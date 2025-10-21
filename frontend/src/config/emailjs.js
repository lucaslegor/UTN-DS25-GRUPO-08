// Configuración de EmailJS
// Reemplaza estos valores con los de tu cuenta de EmailJS

export const EMAILJS_CONFIG = {
  serviceID: "YOUR_SERVICE_ID", // Reemplaza con tu Service ID
  templateID: "YOUR_TEMPLATE_ID", // Reemplaza con tu Template ID
  publicKey: "YOUR_PUBLIC_KEY", // Reemplaza con tu Public Key
};

// Función para inicializar EmailJS
export const initEmailJS = () => {
  // Inicializar EmailJS con tu public key
  // emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Función para enviar email
export const sendEmail = async (templateParams) => {
  const { serviceID, templateID, publicKey } = EMAILJS_CONFIG;
  
  try {
    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    return response;
  } catch (error) {
    console.error("Error al enviar email:", error);
    throw error;
  }
};
