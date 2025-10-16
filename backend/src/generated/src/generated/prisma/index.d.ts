
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model AdminProfile
 * 
 */
export type AdminProfile = $Result.DefaultSelection<Prisma.$AdminProfilePayload>
/**
 * Model Producto
 * 
 */
export type Producto = $Result.DefaultSelection<Prisma.$ProductoPayload>
/**
 * Model Poliza
 * 
 */
export type Poliza = $Result.DefaultSelection<Prisma.$PolizaPayload>
/**
 * Model PedidoItem
 * 
 */
export type PedidoItem = $Result.DefaultSelection<Prisma.$PedidoItemPayload>
/**
 * Model Pedido
 * 
 */
export type Pedido = $Result.DefaultSelection<Prisma.$PedidoPayload>
/**
 * Model CarritoItem
 * 
 */
export type CarritoItem = $Result.DefaultSelection<Prisma.$CarritoItemPayload>
/**
 * Model Carrito
 * 
 */
export type Carrito = $Result.DefaultSelection<Prisma.$CarritoPayload>
/**
 * Model Pago
 * 
 */
export type Pago = $Result.DefaultSelection<Prisma.$PagoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RolUsuario: {
  ADMINISTRADOR: 'ADMINISTRADOR',
  USUARIO: 'USUARIO'
};

export type RolUsuario = (typeof RolUsuario)[keyof typeof RolUsuario]


export const TipoSeguro: {
  AUTO: 'AUTO',
  HOGAR: 'HOGAR',
  VIDA: 'VIDA',
  SALUD: 'SALUD'
};

export type TipoSeguro = (typeof TipoSeguro)[keyof typeof TipoSeguro]


export const EstadoPoliza: {
  PENDIENTE: 'PENDIENTE',
  CARGADA: 'CARGADA'
};

export type EstadoPoliza = (typeof EstadoPoliza)[keyof typeof EstadoPoliza]


export const EstadoPedido: {
  CREADO: 'CREADO',
  PENDIENTE_POLIZA: 'PENDIENTE_POLIZA',
  POLIZA_CARGADA: 'POLIZA_CARGADA',
  PAGO_PENDIENTE: 'PAGO_PENDIENTE',
  PAGO_APROBADO: 'PAGO_APROBADO',
  PAGO_RECHAZADO: 'PAGO_RECHAZADO',
  CANCELADO: 'CANCELADO'
};

export type EstadoPedido = (typeof EstadoPedido)[keyof typeof EstadoPedido]


export const Moneda: {
  ARS: 'ARS'
};

export type Moneda = (typeof Moneda)[keyof typeof Moneda]


export const PasarelaPago: {
  MERCADOPAGO: 'MERCADOPAGO'
};

export type PasarelaPago = (typeof PasarelaPago)[keyof typeof PasarelaPago]


export const EstadoPago: {
  CREADO: 'CREADO',
  PENDIENTE: 'PENDIENTE',
  APROBADO: 'APROBADO',
  RECHAZADO: 'RECHAZADO',
  CANCELADO: 'CANCELADO'
};

export type EstadoPago = (typeof EstadoPago)[keyof typeof EstadoPago]

}

export type RolUsuario = $Enums.RolUsuario

export const RolUsuario: typeof $Enums.RolUsuario

export type TipoSeguro = $Enums.TipoSeguro

export const TipoSeguro: typeof $Enums.TipoSeguro

export type EstadoPoliza = $Enums.EstadoPoliza

export const EstadoPoliza: typeof $Enums.EstadoPoliza

export type EstadoPedido = $Enums.EstadoPedido

export const EstadoPedido: typeof $Enums.EstadoPedido

export type Moneda = $Enums.Moneda

export const Moneda: typeof $Enums.Moneda

export type PasarelaPago = $Enums.PasarelaPago

export const PasarelaPago: typeof $Enums.PasarelaPago

export type EstadoPago = $Enums.EstadoPago

export const EstadoPago: typeof $Enums.EstadoPago

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminProfile`: Exposes CRUD operations for the **AdminProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminProfiles
    * const adminProfiles = await prisma.adminProfile.findMany()
    * ```
    */
  get adminProfile(): Prisma.AdminProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producto`: Exposes CRUD operations for the **Producto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.producto.findMany()
    * ```
    */
  get producto(): Prisma.ProductoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poliza`: Exposes CRUD operations for the **Poliza** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Polizas
    * const polizas = await prisma.poliza.findMany()
    * ```
    */
  get poliza(): Prisma.PolizaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidoItem`: Exposes CRUD operations for the **PedidoItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PedidoItems
    * const pedidoItems = await prisma.pedidoItem.findMany()
    * ```
    */
  get pedidoItem(): Prisma.PedidoItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedido`: Exposes CRUD operations for the **Pedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedido.findMany()
    * ```
    */
  get pedido(): Prisma.PedidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.carritoItem`: Exposes CRUD operations for the **CarritoItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CarritoItems
    * const carritoItems = await prisma.carritoItem.findMany()
    * ```
    */
  get carritoItem(): Prisma.CarritoItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.carrito`: Exposes CRUD operations for the **Carrito** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carritos
    * const carritos = await prisma.carrito.findMany()
    * ```
    */
  get carrito(): Prisma.CarritoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pago`: Exposes CRUD operations for the **Pago** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pago.findMany()
    * ```
    */
  get pago(): Prisma.PagoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    AdminProfile: 'AdminProfile',
    Producto: 'Producto',
    Poliza: 'Poliza',
    PedidoItem: 'PedidoItem',
    Pedido: 'Pedido',
    CarritoItem: 'CarritoItem',
    Carrito: 'Carrito',
    Pago: 'Pago'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "adminProfile" | "producto" | "poliza" | "pedidoItem" | "pedido" | "carritoItem" | "carrito" | "pago"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      AdminProfile: {
        payload: Prisma.$AdminProfilePayload<ExtArgs>
        fields: Prisma.AdminProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          findFirst: {
            args: Prisma.AdminProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          findMany: {
            args: Prisma.AdminProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          create: {
            args: Prisma.AdminProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          createMany: {
            args: Prisma.AdminProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          delete: {
            args: Prisma.AdminProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          update: {
            args: Prisma.AdminProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          deleteMany: {
            args: Prisma.AdminProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          upsert: {
            args: Prisma.AdminProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          aggregate: {
            args: Prisma.AdminProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminProfile>
          }
          groupBy: {
            args: Prisma.AdminProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AdminProfileCountAggregateOutputType> | number
          }
        }
      }
      Producto: {
        payload: Prisma.$ProductoPayload<ExtArgs>
        fields: Prisma.ProductoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findFirst: {
            args: Prisma.ProductoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findMany: {
            args: Prisma.ProductoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          create: {
            args: Prisma.ProductoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          createMany: {
            args: Prisma.ProductoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          delete: {
            args: Prisma.ProductoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          update: {
            args: Prisma.ProductoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          deleteMany: {
            args: Prisma.ProductoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          upsert: {
            args: Prisma.ProductoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          aggregate: {
            args: Prisma.ProductoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto>
          }
          groupBy: {
            args: Prisma.ProductoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoCountAggregateOutputType> | number
          }
        }
      }
      Poliza: {
        payload: Prisma.$PolizaPayload<ExtArgs>
        fields: Prisma.PolizaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolizaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolizaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>
          }
          findFirst: {
            args: Prisma.PolizaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolizaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>
          }
          findMany: {
            args: Prisma.PolizaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>[]
          }
          create: {
            args: Prisma.PolizaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>
          }
          createMany: {
            args: Prisma.PolizaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PolizaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>[]
          }
          delete: {
            args: Prisma.PolizaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>
          }
          update: {
            args: Prisma.PolizaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>
          }
          deleteMany: {
            args: Prisma.PolizaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolizaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PolizaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>[]
          }
          upsert: {
            args: Prisma.PolizaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolizaPayload>
          }
          aggregate: {
            args: Prisma.PolizaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoliza>
          }
          groupBy: {
            args: Prisma.PolizaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolizaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolizaCountArgs<ExtArgs>
            result: $Utils.Optional<PolizaCountAggregateOutputType> | number
          }
        }
      }
      PedidoItem: {
        payload: Prisma.$PedidoItemPayload<ExtArgs>
        fields: Prisma.PedidoItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          findFirst: {
            args: Prisma.PedidoItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          findMany: {
            args: Prisma.PedidoItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[]
          }
          create: {
            args: Prisma.PedidoItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          createMany: {
            args: Prisma.PedidoItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[]
          }
          delete: {
            args: Prisma.PedidoItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          update: {
            args: Prisma.PedidoItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          deleteMany: {
            args: Prisma.PedidoItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidoItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[]
          }
          upsert: {
            args: Prisma.PedidoItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          aggregate: {
            args: Prisma.PedidoItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidoItem>
          }
          groupBy: {
            args: Prisma.PedidoItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoItemCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoItemCountAggregateOutputType> | number
          }
        }
      }
      Pedido: {
        payload: Prisma.$PedidoPayload<ExtArgs>
        fields: Prisma.PedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findFirst: {
            args: Prisma.PedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findMany: {
            args: Prisma.PedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          create: {
            args: Prisma.PedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          createMany: {
            args: Prisma.PedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          delete: {
            args: Prisma.PedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          update: {
            args: Prisma.PedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          deleteMany: {
            args: Prisma.PedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          upsert: {
            args: Prisma.PedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          aggregate: {
            args: Prisma.PedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedido>
          }
          groupBy: {
            args: Prisma.PedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoCountAggregateOutputType> | number
          }
        }
      }
      CarritoItem: {
        payload: Prisma.$CarritoItemPayload<ExtArgs>
        fields: Prisma.CarritoItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarritoItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarritoItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>
          }
          findFirst: {
            args: Prisma.CarritoItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarritoItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>
          }
          findMany: {
            args: Prisma.CarritoItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>[]
          }
          create: {
            args: Prisma.CarritoItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>
          }
          createMany: {
            args: Prisma.CarritoItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarritoItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>[]
          }
          delete: {
            args: Prisma.CarritoItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>
          }
          update: {
            args: Prisma.CarritoItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>
          }
          deleteMany: {
            args: Prisma.CarritoItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarritoItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CarritoItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>[]
          }
          upsert: {
            args: Prisma.CarritoItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoItemPayload>
          }
          aggregate: {
            args: Prisma.CarritoItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarritoItem>
          }
          groupBy: {
            args: Prisma.CarritoItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarritoItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarritoItemCountArgs<ExtArgs>
            result: $Utils.Optional<CarritoItemCountAggregateOutputType> | number
          }
        }
      }
      Carrito: {
        payload: Prisma.$CarritoPayload<ExtArgs>
        fields: Prisma.CarritoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarritoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarritoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>
          }
          findFirst: {
            args: Prisma.CarritoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarritoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>
          }
          findMany: {
            args: Prisma.CarritoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>[]
          }
          create: {
            args: Prisma.CarritoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>
          }
          createMany: {
            args: Prisma.CarritoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarritoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>[]
          }
          delete: {
            args: Prisma.CarritoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>
          }
          update: {
            args: Prisma.CarritoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>
          }
          deleteMany: {
            args: Prisma.CarritoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarritoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CarritoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>[]
          }
          upsert: {
            args: Prisma.CarritoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarritoPayload>
          }
          aggregate: {
            args: Prisma.CarritoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarrito>
          }
          groupBy: {
            args: Prisma.CarritoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarritoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarritoCountArgs<ExtArgs>
            result: $Utils.Optional<CarritoCountAggregateOutputType> | number
          }
        }
      }
      Pago: {
        payload: Prisma.$PagoPayload<ExtArgs>
        fields: Prisma.PagoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findFirst: {
            args: Prisma.PagoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findMany: {
            args: Prisma.PagoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          create: {
            args: Prisma.PagoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          createMany: {
            args: Prisma.PagoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          delete: {
            args: Prisma.PagoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          update: {
            args: Prisma.PagoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          deleteMany: {
            args: Prisma.PagoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PagoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          upsert: {
            args: Prisma.PagoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          aggregate: {
            args: Prisma.PagoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePago>
          }
          groupBy: {
            args: Prisma.PagoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagoCountArgs<ExtArgs>
            result: $Utils.Optional<PagoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    adminProfile?: AdminProfileOmit
    producto?: ProductoOmit
    poliza?: PolizaOmit
    pedidoItem?: PedidoItemOmit
    pedido?: PedidoOmit
    carritoItem?: CarritoItemOmit
    carrito?: CarritoOmit
    pago?: PagoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    pedidos: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | UsuarioCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }


  /**
   * Count Type ProductoCountOutputType
   */

  export type ProductoCountOutputType = {
    itemsPedido: number
    itemsCarrito: number
  }

  export type ProductoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsPedido?: boolean | ProductoCountOutputTypeCountItemsPedidoArgs
    itemsCarrito?: boolean | ProductoCountOutputTypeCountItemsCarritoArgs
  }

  // Custom InputTypes
  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoCountOutputType
     */
    select?: ProductoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountItemsPedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountItemsCarritoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarritoItemWhereInput
  }


  /**
   * Count Type PedidoCountOutputType
   */

  export type PedidoCountOutputType = {
    items: number
  }

  export type PedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PedidoCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoCountOutputType
     */
    select?: PedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
  }


  /**
   * Count Type CarritoCountOutputType
   */

  export type CarritoCountOutputType = {
    items: number
  }

  export type CarritoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CarritoCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CarritoCountOutputType without action
   */
  export type CarritoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoCountOutputType
     */
    select?: CarritoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarritoCountOutputType without action
   */
  export type CarritoCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarritoItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    username: string | null
    mail: string | null
    passwordHash: string | null
    rol: $Enums.RolUsuario | null
    createdAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    username: string | null
    mail: string | null
    passwordHash: string | null
    rol: $Enums.RolUsuario | null
    createdAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    username: number
    mail: number
    passwordHash: number
    rol: number
    createdAt: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    username?: true
    mail?: true
    passwordHash?: true
    rol?: true
    createdAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    username?: true
    mail?: true
    passwordHash?: true
    rol?: true
    createdAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    username?: true
    mail?: true
    passwordHash?: true
    rol?: true
    createdAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    username: string
    mail: string
    passwordHash: string
    rol: $Enums.RolUsuario
    createdAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    mail?: boolean
    passwordHash?: boolean
    rol?: boolean
    createdAt?: boolean
    adminProfile?: boolean | Usuario$adminProfileArgs<ExtArgs>
    pedidos?: boolean | Usuario$pedidosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    mail?: boolean
    passwordHash?: boolean
    rol?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    mail?: boolean
    passwordHash?: boolean
    rol?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    username?: boolean
    mail?: boolean
    passwordHash?: boolean
    rol?: boolean
    createdAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "mail" | "passwordHash" | "rol" | "createdAt", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminProfile?: boolean | Usuario$adminProfileArgs<ExtArgs>
    pedidos?: boolean | Usuario$pedidosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      adminProfile: Prisma.$AdminProfilePayload<ExtArgs> | null
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      mail: string
      passwordHash: string
      rol: $Enums.RolUsuario
      createdAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminProfile<T extends Usuario$adminProfileArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$adminProfileArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pedidos<T extends Usuario$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly username: FieldRef<"Usuario", 'String'>
    readonly mail: FieldRef<"Usuario", 'String'>
    readonly passwordHash: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'RolUsuario'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.adminProfile
   */
  export type Usuario$adminProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    where?: AdminProfileWhereInput
  }

  /**
   * Usuario.pedidos
   */
  export type Usuario$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model AdminProfile
   */

  export type AggregateAdminProfile = {
    _count: AdminProfileCountAggregateOutputType | null
    _avg: AdminProfileAvgAggregateOutputType | null
    _sum: AdminProfileSumAggregateOutputType | null
    _min: AdminProfileMinAggregateOutputType | null
    _max: AdminProfileMaxAggregateOutputType | null
  }

  export type AdminProfileAvgAggregateOutputType = {
    idAdmin: number | null
    idUsuario: number | null
  }

  export type AdminProfileSumAggregateOutputType = {
    idAdmin: number | null
    idUsuario: number | null
  }

  export type AdminProfileMinAggregateOutputType = {
    idAdmin: number | null
    idUsuario: number | null
    nombre: string | null
    email: string | null
    telefono: string | null
    activo: boolean | null
    createdAt: Date | null
  }

  export type AdminProfileMaxAggregateOutputType = {
    idAdmin: number | null
    idUsuario: number | null
    nombre: string | null
    email: string | null
    telefono: string | null
    activo: boolean | null
    createdAt: Date | null
  }

  export type AdminProfileCountAggregateOutputType = {
    idAdmin: number
    idUsuario: number
    nombre: number
    email: number
    telefono: number
    activo: number
    createdAt: number
    _all: number
  }


  export type AdminProfileAvgAggregateInputType = {
    idAdmin?: true
    idUsuario?: true
  }

  export type AdminProfileSumAggregateInputType = {
    idAdmin?: true
    idUsuario?: true
  }

  export type AdminProfileMinAggregateInputType = {
    idAdmin?: true
    idUsuario?: true
    nombre?: true
    email?: true
    telefono?: true
    activo?: true
    createdAt?: true
  }

  export type AdminProfileMaxAggregateInputType = {
    idAdmin?: true
    idUsuario?: true
    nombre?: true
    email?: true
    telefono?: true
    activo?: true
    createdAt?: true
  }

  export type AdminProfileCountAggregateInputType = {
    idAdmin?: true
    idUsuario?: true
    nombre?: true
    email?: true
    telefono?: true
    activo?: true
    createdAt?: true
    _all?: true
  }

  export type AdminProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminProfile to aggregate.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminProfiles
    **/
    _count?: true | AdminProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminProfileMaxAggregateInputType
  }

  export type GetAdminProfileAggregateType<T extends AdminProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminProfile[P]>
      : GetScalarType<T[P], AggregateAdminProfile[P]>
  }




  export type AdminProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminProfileWhereInput
    orderBy?: AdminProfileOrderByWithAggregationInput | AdminProfileOrderByWithAggregationInput[]
    by: AdminProfileScalarFieldEnum[] | AdminProfileScalarFieldEnum
    having?: AdminProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminProfileCountAggregateInputType | true
    _avg?: AdminProfileAvgAggregateInputType
    _sum?: AdminProfileSumAggregateInputType
    _min?: AdminProfileMinAggregateInputType
    _max?: AdminProfileMaxAggregateInputType
  }

  export type AdminProfileGroupByOutputType = {
    idAdmin: number
    idUsuario: number
    nombre: string
    email: string
    telefono: string | null
    activo: boolean
    createdAt: Date
    _count: AdminProfileCountAggregateOutputType | null
    _avg: AdminProfileAvgAggregateOutputType | null
    _sum: AdminProfileSumAggregateOutputType | null
    _min: AdminProfileMinAggregateOutputType | null
    _max: AdminProfileMaxAggregateOutputType | null
  }

  type GetAdminProfileGroupByPayload<T extends AdminProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AdminProfileGroupByOutputType[P]>
        }
      >
    >


  export type AdminProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idAdmin?: boolean
    idUsuario?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    createdAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idAdmin?: boolean
    idUsuario?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    createdAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idAdmin?: boolean
    idUsuario?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    createdAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectScalar = {
    idAdmin?: boolean
    idUsuario?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    createdAt?: boolean
  }

  export type AdminProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idAdmin" | "idUsuario" | "nombre" | "email" | "telefono" | "activo" | "createdAt", ExtArgs["result"]["adminProfile"]>
  export type AdminProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type AdminProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type AdminProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $AdminProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminProfile"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idAdmin: number
      idUsuario: number
      nombre: string
      email: string
      telefono: string | null
      activo: boolean
      createdAt: Date
    }, ExtArgs["result"]["adminProfile"]>
    composites: {}
  }

  type AdminProfileGetPayload<S extends boolean | null | undefined | AdminProfileDefaultArgs> = $Result.GetResult<Prisma.$AdminProfilePayload, S>

  type AdminProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminProfileCountAggregateInputType | true
    }

  export interface AdminProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminProfile'], meta: { name: 'AdminProfile' } }
    /**
     * Find zero or one AdminProfile that matches the filter.
     * @param {AdminProfileFindUniqueArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminProfileFindUniqueArgs>(args: SelectSubset<T, AdminProfileFindUniqueArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminProfileFindUniqueOrThrowArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindFirstArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminProfileFindFirstArgs>(args?: SelectSubset<T, AdminProfileFindFirstArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindFirstOrThrowArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminProfiles
     * const adminProfiles = await prisma.adminProfile.findMany()
     * 
     * // Get first 10 AdminProfiles
     * const adminProfiles = await prisma.adminProfile.findMany({ take: 10 })
     * 
     * // Only select the `idAdmin`
     * const adminProfileWithIdAdminOnly = await prisma.adminProfile.findMany({ select: { idAdmin: true } })
     * 
     */
    findMany<T extends AdminProfileFindManyArgs>(args?: SelectSubset<T, AdminProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminProfile.
     * @param {AdminProfileCreateArgs} args - Arguments to create a AdminProfile.
     * @example
     * // Create one AdminProfile
     * const AdminProfile = await prisma.adminProfile.create({
     *   data: {
     *     // ... data to create a AdminProfile
     *   }
     * })
     * 
     */
    create<T extends AdminProfileCreateArgs>(args: SelectSubset<T, AdminProfileCreateArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminProfiles.
     * @param {AdminProfileCreateManyArgs} args - Arguments to create many AdminProfiles.
     * @example
     * // Create many AdminProfiles
     * const adminProfile = await prisma.adminProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminProfileCreateManyArgs>(args?: SelectSubset<T, AdminProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminProfiles and returns the data saved in the database.
     * @param {AdminProfileCreateManyAndReturnArgs} args - Arguments to create many AdminProfiles.
     * @example
     * // Create many AdminProfiles
     * const adminProfile = await prisma.adminProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminProfiles and only return the `idAdmin`
     * const adminProfileWithIdAdminOnly = await prisma.adminProfile.createManyAndReturn({
     *   select: { idAdmin: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminProfile.
     * @param {AdminProfileDeleteArgs} args - Arguments to delete one AdminProfile.
     * @example
     * // Delete one AdminProfile
     * const AdminProfile = await prisma.adminProfile.delete({
     *   where: {
     *     // ... filter to delete one AdminProfile
     *   }
     * })
     * 
     */
    delete<T extends AdminProfileDeleteArgs>(args: SelectSubset<T, AdminProfileDeleteArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminProfile.
     * @param {AdminProfileUpdateArgs} args - Arguments to update one AdminProfile.
     * @example
     * // Update one AdminProfile
     * const adminProfile = await prisma.adminProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminProfileUpdateArgs>(args: SelectSubset<T, AdminProfileUpdateArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminProfiles.
     * @param {AdminProfileDeleteManyArgs} args - Arguments to filter AdminProfiles to delete.
     * @example
     * // Delete a few AdminProfiles
     * const { count } = await prisma.adminProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminProfileDeleteManyArgs>(args?: SelectSubset<T, AdminProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminProfiles
     * const adminProfile = await prisma.adminProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminProfileUpdateManyArgs>(args: SelectSubset<T, AdminProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminProfiles and returns the data updated in the database.
     * @param {AdminProfileUpdateManyAndReturnArgs} args - Arguments to update many AdminProfiles.
     * @example
     * // Update many AdminProfiles
     * const adminProfile = await prisma.adminProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminProfiles and only return the `idAdmin`
     * const adminProfileWithIdAdminOnly = await prisma.adminProfile.updateManyAndReturn({
     *   select: { idAdmin: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminProfile.
     * @param {AdminProfileUpsertArgs} args - Arguments to update or create a AdminProfile.
     * @example
     * // Update or create a AdminProfile
     * const adminProfile = await prisma.adminProfile.upsert({
     *   create: {
     *     // ... data to create a AdminProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminProfile we want to update
     *   }
     * })
     */
    upsert<T extends AdminProfileUpsertArgs>(args: SelectSubset<T, AdminProfileUpsertArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileCountArgs} args - Arguments to filter AdminProfiles to count.
     * @example
     * // Count the number of AdminProfiles
     * const count = await prisma.adminProfile.count({
     *   where: {
     *     // ... the filter for the AdminProfiles we want to count
     *   }
     * })
    **/
    count<T extends AdminProfileCountArgs>(
      args?: Subset<T, AdminProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminProfileAggregateArgs>(args: Subset<T, AdminProfileAggregateArgs>): Prisma.PrismaPromise<GetAdminProfileAggregateType<T>>

    /**
     * Group by AdminProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminProfileGroupByArgs['orderBy'] }
        : { orderBy?: AdminProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminProfile model
   */
  readonly fields: AdminProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminProfile model
   */
  interface AdminProfileFieldRefs {
    readonly idAdmin: FieldRef<"AdminProfile", 'Int'>
    readonly idUsuario: FieldRef<"AdminProfile", 'Int'>
    readonly nombre: FieldRef<"AdminProfile", 'String'>
    readonly email: FieldRef<"AdminProfile", 'String'>
    readonly telefono: FieldRef<"AdminProfile", 'String'>
    readonly activo: FieldRef<"AdminProfile", 'Boolean'>
    readonly createdAt: FieldRef<"AdminProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminProfile findUnique
   */
  export type AdminProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile findUniqueOrThrow
   */
  export type AdminProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile findFirst
   */
  export type AdminProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminProfiles.
     */
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile findFirstOrThrow
   */
  export type AdminProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminProfiles.
     */
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile findMany
   */
  export type AdminProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfiles to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile create
   */
  export type AdminProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminProfile.
     */
    data: XOR<AdminProfileCreateInput, AdminProfileUncheckedCreateInput>
  }

  /**
   * AdminProfile createMany
   */
  export type AdminProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminProfiles.
     */
    data: AdminProfileCreateManyInput | AdminProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminProfile createManyAndReturn
   */
  export type AdminProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * The data used to create many AdminProfiles.
     */
    data: AdminProfileCreateManyInput | AdminProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminProfile update
   */
  export type AdminProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminProfile.
     */
    data: XOR<AdminProfileUpdateInput, AdminProfileUncheckedUpdateInput>
    /**
     * Choose, which AdminProfile to update.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile updateMany
   */
  export type AdminProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminProfiles.
     */
    data: XOR<AdminProfileUpdateManyMutationInput, AdminProfileUncheckedUpdateManyInput>
    /**
     * Filter which AdminProfiles to update
     */
    where?: AdminProfileWhereInput
    /**
     * Limit how many AdminProfiles to update.
     */
    limit?: number
  }

  /**
   * AdminProfile updateManyAndReturn
   */
  export type AdminProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * The data used to update AdminProfiles.
     */
    data: XOR<AdminProfileUpdateManyMutationInput, AdminProfileUncheckedUpdateManyInput>
    /**
     * Filter which AdminProfiles to update
     */
    where?: AdminProfileWhereInput
    /**
     * Limit how many AdminProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminProfile upsert
   */
  export type AdminProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminProfile to update in case it exists.
     */
    where: AdminProfileWhereUniqueInput
    /**
     * In case the AdminProfile found by the `where` argument doesn't exist, create a new AdminProfile with this data.
     */
    create: XOR<AdminProfileCreateInput, AdminProfileUncheckedCreateInput>
    /**
     * In case the AdminProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminProfileUpdateInput, AdminProfileUncheckedUpdateInput>
  }

  /**
   * AdminProfile delete
   */
  export type AdminProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter which AdminProfile to delete.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile deleteMany
   */
  export type AdminProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminProfiles to delete
     */
    where?: AdminProfileWhereInput
    /**
     * Limit how many AdminProfiles to delete.
     */
    limit?: number
  }

  /**
   * AdminProfile without action
   */
  export type AdminProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
  }


  /**
   * Model Producto
   */

  export type AggregateProducto = {
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  export type ProductoAvgAggregateOutputType = {
    id: number | null
    precio: Decimal | null
  }

  export type ProductoSumAggregateOutputType = {
    id: number | null
    precio: Decimal | null
  }

  export type ProductoMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    descripcion: string | null
    precio: Decimal | null
    cobertura: string | null
    tipo: $Enums.TipoSeguro | null
    isActive: boolean | null
    createdAt: Date | null
    imagenUrl: string | null
  }

  export type ProductoMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    descripcion: string | null
    precio: Decimal | null
    cobertura: string | null
    tipo: $Enums.TipoSeguro | null
    isActive: boolean | null
    createdAt: Date | null
    imagenUrl: string | null
  }

  export type ProductoCountAggregateOutputType = {
    id: number
    titulo: number
    descripcion: number
    precio: number
    cobertura: number
    tipo: number
    isActive: number
    createdAt: number
    imagenUrl: number
    _all: number
  }


  export type ProductoAvgAggregateInputType = {
    id?: true
    precio?: true
  }

  export type ProductoSumAggregateInputType = {
    id?: true
    precio?: true
  }

  export type ProductoMinAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    precio?: true
    cobertura?: true
    tipo?: true
    isActive?: true
    createdAt?: true
    imagenUrl?: true
  }

  export type ProductoMaxAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    precio?: true
    cobertura?: true
    tipo?: true
    isActive?: true
    createdAt?: true
    imagenUrl?: true
  }

  export type ProductoCountAggregateInputType = {
    id?: true
    titulo?: true
    descripcion?: true
    precio?: true
    cobertura?: true
    tipo?: true
    isActive?: true
    createdAt?: true
    imagenUrl?: true
    _all?: true
  }

  export type ProductoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producto to aggregate.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Productos
    **/
    _count?: true | ProductoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoMaxAggregateInputType
  }

  export type GetProductoAggregateType<T extends ProductoAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto[P]>
      : GetScalarType<T[P], AggregateProducto[P]>
  }




  export type ProductoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithAggregationInput | ProductoOrderByWithAggregationInput[]
    by: ProductoScalarFieldEnum[] | ProductoScalarFieldEnum
    having?: ProductoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoCountAggregateInputType | true
    _avg?: ProductoAvgAggregateInputType
    _sum?: ProductoSumAggregateInputType
    _min?: ProductoMinAggregateInputType
    _max?: ProductoMaxAggregateInputType
  }

  export type ProductoGroupByOutputType = {
    id: number
    titulo: string
    descripcion: string
    precio: Decimal
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt: Date
    imagenUrl: string | null
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  type GetProductoGroupByPayload<T extends ProductoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoGroupByOutputType[P]>
        }
      >
    >


  export type ProductoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    cobertura?: boolean
    tipo?: boolean
    isActive?: boolean
    createdAt?: boolean
    imagenUrl?: boolean
    itemsPedido?: boolean | Producto$itemsPedidoArgs<ExtArgs>
    itemsCarrito?: boolean | Producto$itemsCarritoArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    cobertura?: boolean
    tipo?: boolean
    isActive?: boolean
    createdAt?: boolean
    imagenUrl?: boolean
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    cobertura?: boolean
    tipo?: boolean
    isActive?: boolean
    createdAt?: boolean
    imagenUrl?: boolean
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectScalar = {
    id?: boolean
    titulo?: boolean
    descripcion?: boolean
    precio?: boolean
    cobertura?: boolean
    tipo?: boolean
    isActive?: boolean
    createdAt?: boolean
    imagenUrl?: boolean
  }

  export type ProductoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "descripcion" | "precio" | "cobertura" | "tipo" | "isActive" | "createdAt" | "imagenUrl", ExtArgs["result"]["producto"]>
  export type ProductoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsPedido?: boolean | Producto$itemsPedidoArgs<ExtArgs>
    itemsCarrito?: boolean | Producto$itemsCarritoArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producto"
    objects: {
      itemsPedido: Prisma.$PedidoItemPayload<ExtArgs>[]
      itemsCarrito: Prisma.$CarritoItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      descripcion: string
      precio: Prisma.Decimal
      cobertura: string
      tipo: $Enums.TipoSeguro
      isActive: boolean
      createdAt: Date
      imagenUrl: string | null
    }, ExtArgs["result"]["producto"]>
    composites: {}
  }

  type ProductoGetPayload<S extends boolean | null | undefined | ProductoDefaultArgs> = $Result.GetResult<Prisma.$ProductoPayload, S>

  type ProductoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoCountAggregateInputType | true
    }

  export interface ProductoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producto'], meta: { name: 'Producto' } }
    /**
     * Find zero or one Producto that matches the filter.
     * @param {ProductoFindUniqueArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoFindUniqueArgs>(args: SelectSubset<T, ProductoFindUniqueArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoFindUniqueOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoFindFirstArgs>(args?: SelectSubset<T, ProductoFindFirstArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.producto.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.producto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productoWithIdOnly = await prisma.producto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductoFindManyArgs>(args?: SelectSubset<T, ProductoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producto.
     * @param {ProductoCreateArgs} args - Arguments to create a Producto.
     * @example
     * // Create one Producto
     * const Producto = await prisma.producto.create({
     *   data: {
     *     // ... data to create a Producto
     *   }
     * })
     * 
     */
    create<T extends ProductoCreateArgs>(args: SelectSubset<T, ProductoCreateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {ProductoCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoCreateManyArgs>(args?: SelectSubset<T, ProductoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productos and returns the data saved in the database.
     * @param {ProductoCreateManyAndReturnArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productos and only return the `id`
     * const productoWithIdOnly = await prisma.producto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producto.
     * @param {ProductoDeleteArgs} args - Arguments to delete one Producto.
     * @example
     * // Delete one Producto
     * const Producto = await prisma.producto.delete({
     *   where: {
     *     // ... filter to delete one Producto
     *   }
     * })
     * 
     */
    delete<T extends ProductoDeleteArgs>(args: SelectSubset<T, ProductoDeleteArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producto.
     * @param {ProductoUpdateArgs} args - Arguments to update one Producto.
     * @example
     * // Update one Producto
     * const producto = await prisma.producto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoUpdateArgs>(args: SelectSubset<T, ProductoUpdateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {ProductoDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.producto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoDeleteManyArgs>(args?: SelectSubset<T, ProductoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoUpdateManyArgs>(args: SelectSubset<T, ProductoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos and returns the data updated in the database.
     * @param {ProductoUpdateManyAndReturnArgs} args - Arguments to update many Productos.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productos and only return the `id`
     * const productoWithIdOnly = await prisma.producto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producto.
     * @param {ProductoUpsertArgs} args - Arguments to update or create a Producto.
     * @example
     * // Update or create a Producto
     * const producto = await prisma.producto.upsert({
     *   create: {
     *     // ... data to create a Producto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto we want to update
     *   }
     * })
     */
    upsert<T extends ProductoUpsertArgs>(args: SelectSubset<T, ProductoUpsertArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.producto.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends ProductoCountArgs>(
      args?: Subset<T, ProductoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoAggregateArgs>(args: Subset<T, ProductoAggregateArgs>): Prisma.PrismaPromise<GetProductoAggregateType<T>>

    /**
     * Group by Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoGroupByArgs['orderBy'] }
        : { orderBy?: ProductoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producto model
   */
  readonly fields: ProductoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemsPedido<T extends Producto$itemsPedidoArgs<ExtArgs> = {}>(args?: Subset<T, Producto$itemsPedidoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itemsCarrito<T extends Producto$itemsCarritoArgs<ExtArgs> = {}>(args?: Subset<T, Producto$itemsCarritoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Producto model
   */
  interface ProductoFieldRefs {
    readonly id: FieldRef<"Producto", 'Int'>
    readonly titulo: FieldRef<"Producto", 'String'>
    readonly descripcion: FieldRef<"Producto", 'String'>
    readonly precio: FieldRef<"Producto", 'Decimal'>
    readonly cobertura: FieldRef<"Producto", 'String'>
    readonly tipo: FieldRef<"Producto", 'TipoSeguro'>
    readonly isActive: FieldRef<"Producto", 'Boolean'>
    readonly createdAt: FieldRef<"Producto", 'DateTime'>
    readonly imagenUrl: FieldRef<"Producto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Producto findUnique
   */
  export type ProductoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findUniqueOrThrow
   */
  export type ProductoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findFirst
   */
  export type ProductoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findFirstOrThrow
   */
  export type ProductoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findMany
   */
  export type ProductoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto create
   */
  export type ProductoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to create a Producto.
     */
    data: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
  }

  /**
   * Producto createMany
   */
  export type ProductoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producto createManyAndReturn
   */
  export type ProductoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producto update
   */
  export type ProductoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to update a Producto.
     */
    data: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
    /**
     * Choose, which Producto to update.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto updateMany
   */
  export type ProductoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
  }

  /**
   * Producto updateManyAndReturn
   */
  export type ProductoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
  }

  /**
   * Producto upsert
   */
  export type ProductoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The filter to search for the Producto to update in case it exists.
     */
    where: ProductoWhereUniqueInput
    /**
     * In case the Producto found by the `where` argument doesn't exist, create a new Producto with this data.
     */
    create: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
    /**
     * In case the Producto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
  }

  /**
   * Producto delete
   */
  export type ProductoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter which Producto to delete.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto deleteMany
   */
  export type ProductoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to delete
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to delete.
     */
    limit?: number
  }

  /**
   * Producto.itemsPedido
   */
  export type Producto$itemsPedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    cursor?: PedidoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * Producto.itemsCarrito
   */
  export type Producto$itemsCarritoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    where?: CarritoItemWhereInput
    orderBy?: CarritoItemOrderByWithRelationInput | CarritoItemOrderByWithRelationInput[]
    cursor?: CarritoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarritoItemScalarFieldEnum | CarritoItemScalarFieldEnum[]
  }

  /**
   * Producto without action
   */
  export type ProductoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
  }


  /**
   * Model Poliza
   */

  export type AggregatePoliza = {
    _count: PolizaCountAggregateOutputType | null
    _avg: PolizaAvgAggregateOutputType | null
    _sum: PolizaSumAggregateOutputType | null
    _min: PolizaMinAggregateOutputType | null
    _max: PolizaMaxAggregateOutputType | null
  }

  export type PolizaAvgAggregateOutputType = {
    id: number | null
    idPedido: number | null
  }

  export type PolizaSumAggregateOutputType = {
    id: number | null
    idPedido: number | null
  }

  export type PolizaMinAggregateOutputType = {
    id: number | null
    idPedido: number | null
    archivoUrl: string | null
    estado: $Enums.EstadoPoliza | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PolizaMaxAggregateOutputType = {
    id: number | null
    idPedido: number | null
    archivoUrl: string | null
    estado: $Enums.EstadoPoliza | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PolizaCountAggregateOutputType = {
    id: number
    idPedido: number
    archivoUrl: number
    estado: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PolizaAvgAggregateInputType = {
    id?: true
    idPedido?: true
  }

  export type PolizaSumAggregateInputType = {
    id?: true
    idPedido?: true
  }

  export type PolizaMinAggregateInputType = {
    id?: true
    idPedido?: true
    archivoUrl?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PolizaMaxAggregateInputType = {
    id?: true
    idPedido?: true
    archivoUrl?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PolizaCountAggregateInputType = {
    id?: true
    idPedido?: true
    archivoUrl?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PolizaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poliza to aggregate.
     */
    where?: PolizaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polizas to fetch.
     */
    orderBy?: PolizaOrderByWithRelationInput | PolizaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolizaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polizas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polizas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Polizas
    **/
    _count?: true | PolizaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PolizaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PolizaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolizaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolizaMaxAggregateInputType
  }

  export type GetPolizaAggregateType<T extends PolizaAggregateArgs> = {
        [P in keyof T & keyof AggregatePoliza]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoliza[P]>
      : GetScalarType<T[P], AggregatePoliza[P]>
  }




  export type PolizaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolizaWhereInput
    orderBy?: PolizaOrderByWithAggregationInput | PolizaOrderByWithAggregationInput[]
    by: PolizaScalarFieldEnum[] | PolizaScalarFieldEnum
    having?: PolizaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolizaCountAggregateInputType | true
    _avg?: PolizaAvgAggregateInputType
    _sum?: PolizaSumAggregateInputType
    _min?: PolizaMinAggregateInputType
    _max?: PolizaMaxAggregateInputType
  }

  export type PolizaGroupByOutputType = {
    id: number
    idPedido: number
    archivoUrl: string
    estado: $Enums.EstadoPoliza
    createdAt: Date
    updatedAt: Date
    _count: PolizaCountAggregateOutputType | null
    _avg: PolizaAvgAggregateOutputType | null
    _sum: PolizaSumAggregateOutputType | null
    _min: PolizaMinAggregateOutputType | null
    _max: PolizaMaxAggregateOutputType | null
  }

  type GetPolizaGroupByPayload<T extends PolizaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolizaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolizaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolizaGroupByOutputType[P]>
            : GetScalarType<T[P], PolizaGroupByOutputType[P]>
        }
      >
    >


  export type PolizaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPedido?: boolean
    archivoUrl?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poliza"]>

  export type PolizaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPedido?: boolean
    archivoUrl?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poliza"]>

  export type PolizaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPedido?: boolean
    archivoUrl?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poliza"]>

  export type PolizaSelectScalar = {
    id?: boolean
    idPedido?: boolean
    archivoUrl?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PolizaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idPedido" | "archivoUrl" | "estado" | "createdAt" | "updatedAt", ExtArgs["result"]["poliza"]>
  export type PolizaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PolizaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PolizaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }

  export type $PolizaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Poliza"
    objects: {
      pedido: Prisma.$PedidoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      idPedido: number
      archivoUrl: string
      estado: $Enums.EstadoPoliza
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["poliza"]>
    composites: {}
  }

  type PolizaGetPayload<S extends boolean | null | undefined | PolizaDefaultArgs> = $Result.GetResult<Prisma.$PolizaPayload, S>

  type PolizaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PolizaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PolizaCountAggregateInputType | true
    }

  export interface PolizaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Poliza'], meta: { name: 'Poliza' } }
    /**
     * Find zero or one Poliza that matches the filter.
     * @param {PolizaFindUniqueArgs} args - Arguments to find a Poliza
     * @example
     * // Get one Poliza
     * const poliza = await prisma.poliza.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolizaFindUniqueArgs>(args: SelectSubset<T, PolizaFindUniqueArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Poliza that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PolizaFindUniqueOrThrowArgs} args - Arguments to find a Poliza
     * @example
     * // Get one Poliza
     * const poliza = await prisma.poliza.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolizaFindUniqueOrThrowArgs>(args: SelectSubset<T, PolizaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poliza that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaFindFirstArgs} args - Arguments to find a Poliza
     * @example
     * // Get one Poliza
     * const poliza = await prisma.poliza.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolizaFindFirstArgs>(args?: SelectSubset<T, PolizaFindFirstArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poliza that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaFindFirstOrThrowArgs} args - Arguments to find a Poliza
     * @example
     * // Get one Poliza
     * const poliza = await prisma.poliza.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolizaFindFirstOrThrowArgs>(args?: SelectSubset<T, PolizaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Polizas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Polizas
     * const polizas = await prisma.poliza.findMany()
     * 
     * // Get first 10 Polizas
     * const polizas = await prisma.poliza.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const polizaWithIdOnly = await prisma.poliza.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolizaFindManyArgs>(args?: SelectSubset<T, PolizaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Poliza.
     * @param {PolizaCreateArgs} args - Arguments to create a Poliza.
     * @example
     * // Create one Poliza
     * const Poliza = await prisma.poliza.create({
     *   data: {
     *     // ... data to create a Poliza
     *   }
     * })
     * 
     */
    create<T extends PolizaCreateArgs>(args: SelectSubset<T, PolizaCreateArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Polizas.
     * @param {PolizaCreateManyArgs} args - Arguments to create many Polizas.
     * @example
     * // Create many Polizas
     * const poliza = await prisma.poliza.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolizaCreateManyArgs>(args?: SelectSubset<T, PolizaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Polizas and returns the data saved in the database.
     * @param {PolizaCreateManyAndReturnArgs} args - Arguments to create many Polizas.
     * @example
     * // Create many Polizas
     * const poliza = await prisma.poliza.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Polizas and only return the `id`
     * const polizaWithIdOnly = await prisma.poliza.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PolizaCreateManyAndReturnArgs>(args?: SelectSubset<T, PolizaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Poliza.
     * @param {PolizaDeleteArgs} args - Arguments to delete one Poliza.
     * @example
     * // Delete one Poliza
     * const Poliza = await prisma.poliza.delete({
     *   where: {
     *     // ... filter to delete one Poliza
     *   }
     * })
     * 
     */
    delete<T extends PolizaDeleteArgs>(args: SelectSubset<T, PolizaDeleteArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Poliza.
     * @param {PolizaUpdateArgs} args - Arguments to update one Poliza.
     * @example
     * // Update one Poliza
     * const poliza = await prisma.poliza.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolizaUpdateArgs>(args: SelectSubset<T, PolizaUpdateArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Polizas.
     * @param {PolizaDeleteManyArgs} args - Arguments to filter Polizas to delete.
     * @example
     * // Delete a few Polizas
     * const { count } = await prisma.poliza.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolizaDeleteManyArgs>(args?: SelectSubset<T, PolizaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Polizas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Polizas
     * const poliza = await prisma.poliza.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolizaUpdateManyArgs>(args: SelectSubset<T, PolizaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Polizas and returns the data updated in the database.
     * @param {PolizaUpdateManyAndReturnArgs} args - Arguments to update many Polizas.
     * @example
     * // Update many Polizas
     * const poliza = await prisma.poliza.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Polizas and only return the `id`
     * const polizaWithIdOnly = await prisma.poliza.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PolizaUpdateManyAndReturnArgs>(args: SelectSubset<T, PolizaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Poliza.
     * @param {PolizaUpsertArgs} args - Arguments to update or create a Poliza.
     * @example
     * // Update or create a Poliza
     * const poliza = await prisma.poliza.upsert({
     *   create: {
     *     // ... data to create a Poliza
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poliza we want to update
     *   }
     * })
     */
    upsert<T extends PolizaUpsertArgs>(args: SelectSubset<T, PolizaUpsertArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Polizas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaCountArgs} args - Arguments to filter Polizas to count.
     * @example
     * // Count the number of Polizas
     * const count = await prisma.poliza.count({
     *   where: {
     *     // ... the filter for the Polizas we want to count
     *   }
     * })
    **/
    count<T extends PolizaCountArgs>(
      args?: Subset<T, PolizaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolizaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poliza.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PolizaAggregateArgs>(args: Subset<T, PolizaAggregateArgs>): Prisma.PrismaPromise<GetPolizaAggregateType<T>>

    /**
     * Group by Poliza.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolizaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PolizaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolizaGroupByArgs['orderBy'] }
        : { orderBy?: PolizaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PolizaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolizaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Poliza model
   */
  readonly fields: PolizaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Poliza.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolizaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Poliza model
   */
  interface PolizaFieldRefs {
    readonly id: FieldRef<"Poliza", 'Int'>
    readonly idPedido: FieldRef<"Poliza", 'Int'>
    readonly archivoUrl: FieldRef<"Poliza", 'String'>
    readonly estado: FieldRef<"Poliza", 'EstadoPoliza'>
    readonly createdAt: FieldRef<"Poliza", 'DateTime'>
    readonly updatedAt: FieldRef<"Poliza", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Poliza findUnique
   */
  export type PolizaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * Filter, which Poliza to fetch.
     */
    where: PolizaWhereUniqueInput
  }

  /**
   * Poliza findUniqueOrThrow
   */
  export type PolizaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * Filter, which Poliza to fetch.
     */
    where: PolizaWhereUniqueInput
  }

  /**
   * Poliza findFirst
   */
  export type PolizaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * Filter, which Poliza to fetch.
     */
    where?: PolizaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polizas to fetch.
     */
    orderBy?: PolizaOrderByWithRelationInput | PolizaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Polizas.
     */
    cursor?: PolizaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polizas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polizas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polizas.
     */
    distinct?: PolizaScalarFieldEnum | PolizaScalarFieldEnum[]
  }

  /**
   * Poliza findFirstOrThrow
   */
  export type PolizaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * Filter, which Poliza to fetch.
     */
    where?: PolizaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polizas to fetch.
     */
    orderBy?: PolizaOrderByWithRelationInput | PolizaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Polizas.
     */
    cursor?: PolizaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polizas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polizas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polizas.
     */
    distinct?: PolizaScalarFieldEnum | PolizaScalarFieldEnum[]
  }

  /**
   * Poliza findMany
   */
  export type PolizaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * Filter, which Polizas to fetch.
     */
    where?: PolizaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polizas to fetch.
     */
    orderBy?: PolizaOrderByWithRelationInput | PolizaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Polizas.
     */
    cursor?: PolizaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polizas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polizas.
     */
    skip?: number
    distinct?: PolizaScalarFieldEnum | PolizaScalarFieldEnum[]
  }

  /**
   * Poliza create
   */
  export type PolizaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * The data needed to create a Poliza.
     */
    data: XOR<PolizaCreateInput, PolizaUncheckedCreateInput>
  }

  /**
   * Poliza createMany
   */
  export type PolizaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Polizas.
     */
    data: PolizaCreateManyInput | PolizaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poliza createManyAndReturn
   */
  export type PolizaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * The data used to create many Polizas.
     */
    data: PolizaCreateManyInput | PolizaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Poliza update
   */
  export type PolizaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * The data needed to update a Poliza.
     */
    data: XOR<PolizaUpdateInput, PolizaUncheckedUpdateInput>
    /**
     * Choose, which Poliza to update.
     */
    where: PolizaWhereUniqueInput
  }

  /**
   * Poliza updateMany
   */
  export type PolizaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Polizas.
     */
    data: XOR<PolizaUpdateManyMutationInput, PolizaUncheckedUpdateManyInput>
    /**
     * Filter which Polizas to update
     */
    where?: PolizaWhereInput
    /**
     * Limit how many Polizas to update.
     */
    limit?: number
  }

  /**
   * Poliza updateManyAndReturn
   */
  export type PolizaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * The data used to update Polizas.
     */
    data: XOR<PolizaUpdateManyMutationInput, PolizaUncheckedUpdateManyInput>
    /**
     * Filter which Polizas to update
     */
    where?: PolizaWhereInput
    /**
     * Limit how many Polizas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Poliza upsert
   */
  export type PolizaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * The filter to search for the Poliza to update in case it exists.
     */
    where: PolizaWhereUniqueInput
    /**
     * In case the Poliza found by the `where` argument doesn't exist, create a new Poliza with this data.
     */
    create: XOR<PolizaCreateInput, PolizaUncheckedCreateInput>
    /**
     * In case the Poliza was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolizaUpdateInput, PolizaUncheckedUpdateInput>
  }

  /**
   * Poliza delete
   */
  export type PolizaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    /**
     * Filter which Poliza to delete.
     */
    where: PolizaWhereUniqueInput
  }

  /**
   * Poliza deleteMany
   */
  export type PolizaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Polizas to delete
     */
    where?: PolizaWhereInput
    /**
     * Limit how many Polizas to delete.
     */
    limit?: number
  }

  /**
   * Poliza without action
   */
  export type PolizaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
  }


  /**
   * Model PedidoItem
   */

  export type AggregatePedidoItem = {
    _count: PedidoItemCountAggregateOutputType | null
    _avg: PedidoItemAvgAggregateOutputType | null
    _sum: PedidoItemSumAggregateOutputType | null
    _min: PedidoItemMinAggregateOutputType | null
    _max: PedidoItemMaxAggregateOutputType | null
  }

  export type PedidoItemAvgAggregateOutputType = {
    idProducto: number | null
    idPedido: number | null
    precio: Decimal | null
    cantidad: number | null
  }

  export type PedidoItemSumAggregateOutputType = {
    idProducto: number | null
    idPedido: number | null
    precio: Decimal | null
    cantidad: number | null
  }

  export type PedidoItemMinAggregateOutputType = {
    idProducto: number | null
    idPedido: number | null
    titulo: string | null
    precio: Decimal | null
    cantidad: number | null
  }

  export type PedidoItemMaxAggregateOutputType = {
    idProducto: number | null
    idPedido: number | null
    titulo: string | null
    precio: Decimal | null
    cantidad: number | null
  }

  export type PedidoItemCountAggregateOutputType = {
    idProducto: number
    idPedido: number
    titulo: number
    precio: number
    cantidad: number
    _all: number
  }


  export type PedidoItemAvgAggregateInputType = {
    idProducto?: true
    idPedido?: true
    precio?: true
    cantidad?: true
  }

  export type PedidoItemSumAggregateInputType = {
    idProducto?: true
    idPedido?: true
    precio?: true
    cantidad?: true
  }

  export type PedidoItemMinAggregateInputType = {
    idProducto?: true
    idPedido?: true
    titulo?: true
    precio?: true
    cantidad?: true
  }

  export type PedidoItemMaxAggregateInputType = {
    idProducto?: true
    idPedido?: true
    titulo?: true
    precio?: true
    cantidad?: true
  }

  export type PedidoItemCountAggregateInputType = {
    idProducto?: true
    idPedido?: true
    titulo?: true
    precio?: true
    cantidad?: true
    _all?: true
  }

  export type PedidoItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoItem to aggregate.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PedidoItems
    **/
    _count?: true | PedidoItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoItemMaxAggregateInputType
  }

  export type GetPedidoItemAggregateType<T extends PedidoItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoItem[P]>
      : GetScalarType<T[P], AggregatePedidoItem[P]>
  }




  export type PedidoItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithAggregationInput | PedidoItemOrderByWithAggregationInput[]
    by: PedidoItemScalarFieldEnum[] | PedidoItemScalarFieldEnum
    having?: PedidoItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoItemCountAggregateInputType | true
    _avg?: PedidoItemAvgAggregateInputType
    _sum?: PedidoItemSumAggregateInputType
    _min?: PedidoItemMinAggregateInputType
    _max?: PedidoItemMaxAggregateInputType
  }

  export type PedidoItemGroupByOutputType = {
    idProducto: number
    idPedido: number
    titulo: string
    precio: Decimal
    cantidad: number
    _count: PedidoItemCountAggregateOutputType | null
    _avg: PedidoItemAvgAggregateOutputType | null
    _sum: PedidoItemSumAggregateOutputType | null
    _min: PedidoItemMinAggregateOutputType | null
    _max: PedidoItemMaxAggregateOutputType | null
  }

  type GetPedidoItemGroupByPayload<T extends PedidoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
        }
      >
    >


  export type PedidoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProducto?: boolean
    idPedido?: boolean
    titulo?: boolean
    precio?: boolean
    cantidad?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoItem"]>

  export type PedidoItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProducto?: boolean
    idPedido?: boolean
    titulo?: boolean
    precio?: boolean
    cantidad?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoItem"]>

  export type PedidoItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProducto?: boolean
    idPedido?: boolean
    titulo?: boolean
    precio?: boolean
    cantidad?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoItem"]>

  export type PedidoItemSelectScalar = {
    idProducto?: boolean
    idPedido?: boolean
    titulo?: boolean
    precio?: boolean
    cantidad?: boolean
  }

  export type PedidoItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idProducto" | "idPedido" | "titulo" | "precio" | "cantidad", ExtArgs["result"]["pedidoItem"]>
  export type PedidoItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }

  export type $PedidoItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PedidoItem"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
      pedido: Prisma.$PedidoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idProducto: number
      idPedido: number
      titulo: string
      precio: Prisma.Decimal
      cantidad: number
    }, ExtArgs["result"]["pedidoItem"]>
    composites: {}
  }

  type PedidoItemGetPayload<S extends boolean | null | undefined | PedidoItemDefaultArgs> = $Result.GetResult<Prisma.$PedidoItemPayload, S>

  type PedidoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoItemCountAggregateInputType | true
    }

  export interface PedidoItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PedidoItem'], meta: { name: 'PedidoItem' } }
    /**
     * Find zero or one PedidoItem that matches the filter.
     * @param {PedidoItemFindUniqueArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoItemFindUniqueArgs>(args: SelectSubset<T, PedidoItemFindUniqueArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PedidoItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoItemFindUniqueOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoItemFindFirstArgs>(args?: SelectSubset<T, PedidoItemFindFirstArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PedidoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany()
     * 
     * // Get first 10 PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany({ take: 10 })
     * 
     * // Only select the `idProducto`
     * const pedidoItemWithIdProductoOnly = await prisma.pedidoItem.findMany({ select: { idProducto: true } })
     * 
     */
    findMany<T extends PedidoItemFindManyArgs>(args?: SelectSubset<T, PedidoItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PedidoItem.
     * @param {PedidoItemCreateArgs} args - Arguments to create a PedidoItem.
     * @example
     * // Create one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.create({
     *   data: {
     *     // ... data to create a PedidoItem
     *   }
     * })
     * 
     */
    create<T extends PedidoItemCreateArgs>(args: SelectSubset<T, PedidoItemCreateArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PedidoItems.
     * @param {PedidoItemCreateManyArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoItemCreateManyArgs>(args?: SelectSubset<T, PedidoItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PedidoItems and returns the data saved in the database.
     * @param {PedidoItemCreateManyAndReturnArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PedidoItems and only return the `idProducto`
     * const pedidoItemWithIdProductoOnly = await prisma.pedidoItem.createManyAndReturn({
     *   select: { idProducto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoItemCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PedidoItem.
     * @param {PedidoItemDeleteArgs} args - Arguments to delete one PedidoItem.
     * @example
     * // Delete one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.delete({
     *   where: {
     *     // ... filter to delete one PedidoItem
     *   }
     * })
     * 
     */
    delete<T extends PedidoItemDeleteArgs>(args: SelectSubset<T, PedidoItemDeleteArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PedidoItem.
     * @param {PedidoItemUpdateArgs} args - Arguments to update one PedidoItem.
     * @example
     * // Update one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoItemUpdateArgs>(args: SelectSubset<T, PedidoItemUpdateArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PedidoItems.
     * @param {PedidoItemDeleteManyArgs} args - Arguments to filter PedidoItems to delete.
     * @example
     * // Delete a few PedidoItems
     * const { count } = await prisma.pedidoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoItemDeleteManyArgs>(args?: SelectSubset<T, PedidoItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoItemUpdateManyArgs>(args: SelectSubset<T, PedidoItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoItems and returns the data updated in the database.
     * @param {PedidoItemUpdateManyAndReturnArgs} args - Arguments to update many PedidoItems.
     * @example
     * // Update many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PedidoItems and only return the `idProducto`
     * const pedidoItemWithIdProductoOnly = await prisma.pedidoItem.updateManyAndReturn({
     *   select: { idProducto: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidoItemUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidoItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PedidoItem.
     * @param {PedidoItemUpsertArgs} args - Arguments to update or create a PedidoItem.
     * @example
     * // Update or create a PedidoItem
     * const pedidoItem = await prisma.pedidoItem.upsert({
     *   create: {
     *     // ... data to create a PedidoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoItem we want to update
     *   }
     * })
     */
    upsert<T extends PedidoItemUpsertArgs>(args: SelectSubset<T, PedidoItemUpsertArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemCountArgs} args - Arguments to filter PedidoItems to count.
     * @example
     * // Count the number of PedidoItems
     * const count = await prisma.pedidoItem.count({
     *   where: {
     *     // ... the filter for the PedidoItems we want to count
     *   }
     * })
    **/
    count<T extends PedidoItemCountArgs>(
      args?: Subset<T, PedidoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoItemAggregateArgs>(args: Subset<T, PedidoItemAggregateArgs>): Prisma.PrismaPromise<GetPedidoItemAggregateType<T>>

    /**
     * Group by PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoItemGroupByArgs['orderBy'] }
        : { orderBy?: PedidoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PedidoItem model
   */
  readonly fields: PedidoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PedidoItem model
   */
  interface PedidoItemFieldRefs {
    readonly idProducto: FieldRef<"PedidoItem", 'Int'>
    readonly idPedido: FieldRef<"PedidoItem", 'Int'>
    readonly titulo: FieldRef<"PedidoItem", 'String'>
    readonly precio: FieldRef<"PedidoItem", 'Decimal'>
    readonly cantidad: FieldRef<"PedidoItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PedidoItem findUnique
   */
  export type PedidoItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem findUniqueOrThrow
   */
  export type PedidoItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem findFirst
   */
  export type PedidoItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem findFirstOrThrow
   */
  export type PedidoItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem findMany
   */
  export type PedidoItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItems to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem create
   */
  export type PedidoItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PedidoItem.
     */
    data: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>
  }

  /**
   * PedidoItem createMany
   */
  export type PedidoItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PedidoItem createManyAndReturn
   */
  export type PedidoItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoItem update
   */
  export type PedidoItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PedidoItem.
     */
    data: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>
    /**
     * Choose, which PedidoItem to update.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem updateMany
   */
  export type PedidoItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PedidoItems.
     */
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyInput>
    /**
     * Filter which PedidoItems to update
     */
    where?: PedidoItemWhereInput
    /**
     * Limit how many PedidoItems to update.
     */
    limit?: number
  }

  /**
   * PedidoItem updateManyAndReturn
   */
  export type PedidoItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * The data used to update PedidoItems.
     */
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyInput>
    /**
     * Filter which PedidoItems to update
     */
    where?: PedidoItemWhereInput
    /**
     * Limit how many PedidoItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoItem upsert
   */
  export type PedidoItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PedidoItem to update in case it exists.
     */
    where: PedidoItemWhereUniqueInput
    /**
     * In case the PedidoItem found by the `where` argument doesn't exist, create a new PedidoItem with this data.
     */
    create: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>
    /**
     * In case the PedidoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>
  }

  /**
   * PedidoItem delete
   */
  export type PedidoItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter which PedidoItem to delete.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem deleteMany
   */
  export type PedidoItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoItems to delete
     */
    where?: PedidoItemWhereInput
    /**
     * Limit how many PedidoItems to delete.
     */
    limit?: number
  }

  /**
   * PedidoItem without action
   */
  export type PedidoItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
  }


  /**
   * Model Pedido
   */

  export type AggregatePedido = {
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  export type PedidoAvgAggregateOutputType = {
    id: number | null
    idUsuario: number | null
    subtotal: Decimal | null
    total: Decimal | null
  }

  export type PedidoSumAggregateOutputType = {
    id: number | null
    idUsuario: number | null
    subtotal: Decimal | null
    total: Decimal | null
  }

  export type PedidoMinAggregateOutputType = {
    id: number | null
    idUsuario: number | null
    subtotal: Decimal | null
    total: Decimal | null
    moneda: $Enums.Moneda | null
    estado: $Enums.EstadoPedido | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidoMaxAggregateOutputType = {
    id: number | null
    idUsuario: number | null
    subtotal: Decimal | null
    total: Decimal | null
    moneda: $Enums.Moneda | null
    estado: $Enums.EstadoPedido | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidoCountAggregateOutputType = {
    id: number
    idUsuario: number
    subtotal: number
    total: number
    moneda: number
    estado: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PedidoAvgAggregateInputType = {
    id?: true
    idUsuario?: true
    subtotal?: true
    total?: true
  }

  export type PedidoSumAggregateInputType = {
    id?: true
    idUsuario?: true
    subtotal?: true
    total?: true
  }

  export type PedidoMinAggregateInputType = {
    id?: true
    idUsuario?: true
    subtotal?: true
    total?: true
    moneda?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidoMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    subtotal?: true
    total?: true
    moneda?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidoCountAggregateInputType = {
    id?: true
    idUsuario?: true
    subtotal?: true
    total?: true
    moneda?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedido to aggregate.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoMaxAggregateInputType
  }

  export type GetPedidoAggregateType<T extends PedidoAggregateArgs> = {
        [P in keyof T & keyof AggregatePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido[P]>
      : GetScalarType<T[P], AggregatePedido[P]>
  }




  export type PedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithAggregationInput | PedidoOrderByWithAggregationInput[]
    by: PedidoScalarFieldEnum[] | PedidoScalarFieldEnum
    having?: PedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoCountAggregateInputType | true
    _avg?: PedidoAvgAggregateInputType
    _sum?: PedidoSumAggregateInputType
    _min?: PedidoMinAggregateInputType
    _max?: PedidoMaxAggregateInputType
  }

  export type PedidoGroupByOutputType = {
    id: number
    idUsuario: number
    subtotal: Decimal
    total: Decimal
    moneda: $Enums.Moneda
    estado: $Enums.EstadoPedido
    createdAt: Date
    updatedAt: Date
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  type GetPedidoGroupByPayload<T extends PedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoGroupByOutputType[P]>
        }
      >
    >


  export type PedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    subtotal?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    items?: boolean | Pedido$itemsArgs<ExtArgs>
    poliza?: boolean | Pedido$polizaArgs<ExtArgs>
    pago?: boolean | Pedido$pagoArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    subtotal?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    subtotal?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    subtotal?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "subtotal" | "total" | "moneda" | "estado" | "createdAt" | "updatedAt", ExtArgs["result"]["pedido"]>
  export type PedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    items?: boolean | Pedido$itemsArgs<ExtArgs>
    poliza?: boolean | Pedido$polizaArgs<ExtArgs>
    pago?: boolean | Pedido$pagoArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PedidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type PedidoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $PedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedido"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      items: Prisma.$PedidoItemPayload<ExtArgs>[]
      poliza: Prisma.$PolizaPayload<ExtArgs> | null
      pago: Prisma.$PagoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      idUsuario: number
      subtotal: Prisma.Decimal
      total: Prisma.Decimal
      moneda: $Enums.Moneda
      estado: $Enums.EstadoPedido
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pedido"]>
    composites: {}
  }

  type PedidoGetPayload<S extends boolean | null | undefined | PedidoDefaultArgs> = $Result.GetResult<Prisma.$PedidoPayload, S>

  type PedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoCountAggregateInputType | true
    }

  export interface PedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedido'], meta: { name: 'Pedido' } }
    /**
     * Find zero or one Pedido that matches the filter.
     * @param {PedidoFindUniqueArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoFindUniqueArgs>(args: SelectSubset<T, PedidoFindUniqueArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoFindUniqueOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoFindFirstArgs>(args?: SelectSubset<T, PedidoFindFirstArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedido.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoWithIdOnly = await prisma.pedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoFindManyArgs>(args?: SelectSubset<T, PedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedido.
     * @param {PedidoCreateArgs} args - Arguments to create a Pedido.
     * @example
     * // Create one Pedido
     * const Pedido = await prisma.pedido.create({
     *   data: {
     *     // ... data to create a Pedido
     *   }
     * })
     * 
     */
    create<T extends PedidoCreateArgs>(args: SelectSubset<T, PedidoCreateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {PedidoCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoCreateManyArgs>(args?: SelectSubset<T, PedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {PedidoCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id`
     * const pedidoWithIdOnly = await prisma.pedido.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedido.
     * @param {PedidoDeleteArgs} args - Arguments to delete one Pedido.
     * @example
     * // Delete one Pedido
     * const Pedido = await prisma.pedido.delete({
     *   where: {
     *     // ... filter to delete one Pedido
     *   }
     * })
     * 
     */
    delete<T extends PedidoDeleteArgs>(args: SelectSubset<T, PedidoDeleteArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedido.
     * @param {PedidoUpdateArgs} args - Arguments to update one Pedido.
     * @example
     * // Update one Pedido
     * const pedido = await prisma.pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoUpdateArgs>(args: SelectSubset<T, PedidoUpdateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidoDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoDeleteManyArgs>(args?: SelectSubset<T, PedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoUpdateManyArgs>(args: SelectSubset<T, PedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos and returns the data updated in the database.
     * @param {PedidoUpdateManyAndReturnArgs} args - Arguments to update many Pedidos.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedidos and only return the `id`
     * const pedidoWithIdOnly = await prisma.pedido.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidoUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedido.
     * @param {PedidoUpsertArgs} args - Arguments to update or create a Pedido.
     * @example
     * // Update or create a Pedido
     * const pedido = await prisma.pedido.upsert({
     *   create: {
     *     // ... data to create a Pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido we want to update
     *   }
     * })
     */
    upsert<T extends PedidoUpsertArgs>(args: SelectSubset<T, PedidoUpsertArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedido.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidoCountArgs>(
      args?: Subset<T, PedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoAggregateArgs>(args: Subset<T, PedidoAggregateArgs>): Prisma.PrismaPromise<GetPedidoAggregateType<T>>

    /**
     * Group by Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedido model
   */
  readonly fields: PedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Pedido$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    poliza<T extends Pedido$polizaArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$polizaArgs<ExtArgs>>): Prisma__PolizaClient<$Result.GetResult<Prisma.$PolizaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pago<T extends Pedido$pagoArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$pagoArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedido model
   */
  interface PedidoFieldRefs {
    readonly id: FieldRef<"Pedido", 'Int'>
    readonly idUsuario: FieldRef<"Pedido", 'Int'>
    readonly subtotal: FieldRef<"Pedido", 'Decimal'>
    readonly total: FieldRef<"Pedido", 'Decimal'>
    readonly moneda: FieldRef<"Pedido", 'Moneda'>
    readonly estado: FieldRef<"Pedido", 'EstadoPedido'>
    readonly createdAt: FieldRef<"Pedido", 'DateTime'>
    readonly updatedAt: FieldRef<"Pedido", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pedido findUnique
   */
  export type PedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findUniqueOrThrow
   */
  export type PedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findFirst
   */
  export type PedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findFirstOrThrow
   */
  export type PedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findMany
   */
  export type PedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido create
   */
  export type PedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedido.
     */
    data: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
  }

  /**
   * Pedido createMany
   */
  export type PedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedido createManyAndReturn
   */
  export type PedidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedido update
   */
  export type PedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedido.
     */
    data: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
    /**
     * Choose, which Pedido to update.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido updateMany
   */
  export type PedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedido updateManyAndReturn
   */
  export type PedidoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedido upsert
   */
  export type PedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedido to update in case it exists.
     */
    where: PedidoWhereUniqueInput
    /**
     * In case the Pedido found by the `where` argument doesn't exist, create a new Pedido with this data.
     */
    create: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
    /**
     * In case the Pedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
  }

  /**
   * Pedido delete
   */
  export type PedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter which Pedido to delete.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido deleteMany
   */
  export type PedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to delete.
     */
    limit?: number
  }

  /**
   * Pedido.items
   */
  export type Pedido$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoItem
     */
    omit?: PedidoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    cursor?: PedidoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * Pedido.poliza
   */
  export type Pedido$polizaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poliza
     */
    select?: PolizaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poliza
     */
    omit?: PolizaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolizaInclude<ExtArgs> | null
    where?: PolizaWhereInput
  }

  /**
   * Pedido.pago
   */
  export type Pedido$pagoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    where?: PagoWhereInput
  }

  /**
   * Pedido without action
   */
  export type PedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
  }


  /**
   * Model CarritoItem
   */

  export type AggregateCarritoItem = {
    _count: CarritoItemCountAggregateOutputType | null
    _avg: CarritoItemAvgAggregateOutputType | null
    _sum: CarritoItemSumAggregateOutputType | null
    _min: CarritoItemMinAggregateOutputType | null
    _max: CarritoItemMaxAggregateOutputType | null
  }

  export type CarritoItemAvgAggregateOutputType = {
    idProducto: number | null
    idCarrito: number | null
    cantidad: number | null
  }

  export type CarritoItemSumAggregateOutputType = {
    idProducto: number | null
    idCarrito: number | null
    cantidad: number | null
  }

  export type CarritoItemMinAggregateOutputType = {
    idProducto: number | null
    idCarrito: number | null
    cantidad: number | null
  }

  export type CarritoItemMaxAggregateOutputType = {
    idProducto: number | null
    idCarrito: number | null
    cantidad: number | null
  }

  export type CarritoItemCountAggregateOutputType = {
    idProducto: number
    idCarrito: number
    cantidad: number
    _all: number
  }


  export type CarritoItemAvgAggregateInputType = {
    idProducto?: true
    idCarrito?: true
    cantidad?: true
  }

  export type CarritoItemSumAggregateInputType = {
    idProducto?: true
    idCarrito?: true
    cantidad?: true
  }

  export type CarritoItemMinAggregateInputType = {
    idProducto?: true
    idCarrito?: true
    cantidad?: true
  }

  export type CarritoItemMaxAggregateInputType = {
    idProducto?: true
    idCarrito?: true
    cantidad?: true
  }

  export type CarritoItemCountAggregateInputType = {
    idProducto?: true
    idCarrito?: true
    cantidad?: true
    _all?: true
  }

  export type CarritoItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarritoItem to aggregate.
     */
    where?: CarritoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarritoItems to fetch.
     */
    orderBy?: CarritoItemOrderByWithRelationInput | CarritoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarritoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarritoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarritoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CarritoItems
    **/
    _count?: true | CarritoItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarritoItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarritoItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarritoItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarritoItemMaxAggregateInputType
  }

  export type GetCarritoItemAggregateType<T extends CarritoItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCarritoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarritoItem[P]>
      : GetScalarType<T[P], AggregateCarritoItem[P]>
  }




  export type CarritoItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarritoItemWhereInput
    orderBy?: CarritoItemOrderByWithAggregationInput | CarritoItemOrderByWithAggregationInput[]
    by: CarritoItemScalarFieldEnum[] | CarritoItemScalarFieldEnum
    having?: CarritoItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarritoItemCountAggregateInputType | true
    _avg?: CarritoItemAvgAggregateInputType
    _sum?: CarritoItemSumAggregateInputType
    _min?: CarritoItemMinAggregateInputType
    _max?: CarritoItemMaxAggregateInputType
  }

  export type CarritoItemGroupByOutputType = {
    idProducto: number
    idCarrito: number
    cantidad: number
    _count: CarritoItemCountAggregateOutputType | null
    _avg: CarritoItemAvgAggregateOutputType | null
    _sum: CarritoItemSumAggregateOutputType | null
    _min: CarritoItemMinAggregateOutputType | null
    _max: CarritoItemMaxAggregateOutputType | null
  }

  type GetCarritoItemGroupByPayload<T extends CarritoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarritoItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarritoItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarritoItemGroupByOutputType[P]>
            : GetScalarType<T[P], CarritoItemGroupByOutputType[P]>
        }
      >
    >


  export type CarritoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProducto?: boolean
    idCarrito?: boolean
    cantidad?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    carrito?: boolean | CarritoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carritoItem"]>

  export type CarritoItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProducto?: boolean
    idCarrito?: boolean
    cantidad?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    carrito?: boolean | CarritoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carritoItem"]>

  export type CarritoItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProducto?: boolean
    idCarrito?: boolean
    cantidad?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    carrito?: boolean | CarritoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carritoItem"]>

  export type CarritoItemSelectScalar = {
    idProducto?: boolean
    idCarrito?: boolean
    cantidad?: boolean
  }

  export type CarritoItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idProducto" | "idCarrito" | "cantidad", ExtArgs["result"]["carritoItem"]>
  export type CarritoItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    carrito?: boolean | CarritoDefaultArgs<ExtArgs>
  }
  export type CarritoItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    carrito?: boolean | CarritoDefaultArgs<ExtArgs>
  }
  export type CarritoItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    carrito?: boolean | CarritoDefaultArgs<ExtArgs>
  }

  export type $CarritoItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CarritoItem"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
      carrito: Prisma.$CarritoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idProducto: number
      idCarrito: number
      cantidad: number
    }, ExtArgs["result"]["carritoItem"]>
    composites: {}
  }

  type CarritoItemGetPayload<S extends boolean | null | undefined | CarritoItemDefaultArgs> = $Result.GetResult<Prisma.$CarritoItemPayload, S>

  type CarritoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarritoItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarritoItemCountAggregateInputType | true
    }

  export interface CarritoItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CarritoItem'], meta: { name: 'CarritoItem' } }
    /**
     * Find zero or one CarritoItem that matches the filter.
     * @param {CarritoItemFindUniqueArgs} args - Arguments to find a CarritoItem
     * @example
     * // Get one CarritoItem
     * const carritoItem = await prisma.carritoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarritoItemFindUniqueArgs>(args: SelectSubset<T, CarritoItemFindUniqueArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CarritoItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarritoItemFindUniqueOrThrowArgs} args - Arguments to find a CarritoItem
     * @example
     * // Get one CarritoItem
     * const carritoItem = await prisma.carritoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarritoItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CarritoItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CarritoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemFindFirstArgs} args - Arguments to find a CarritoItem
     * @example
     * // Get one CarritoItem
     * const carritoItem = await prisma.carritoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarritoItemFindFirstArgs>(args?: SelectSubset<T, CarritoItemFindFirstArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CarritoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemFindFirstOrThrowArgs} args - Arguments to find a CarritoItem
     * @example
     * // Get one CarritoItem
     * const carritoItem = await prisma.carritoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarritoItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CarritoItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CarritoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CarritoItems
     * const carritoItems = await prisma.carritoItem.findMany()
     * 
     * // Get first 10 CarritoItems
     * const carritoItems = await prisma.carritoItem.findMany({ take: 10 })
     * 
     * // Only select the `idProducto`
     * const carritoItemWithIdProductoOnly = await prisma.carritoItem.findMany({ select: { idProducto: true } })
     * 
     */
    findMany<T extends CarritoItemFindManyArgs>(args?: SelectSubset<T, CarritoItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CarritoItem.
     * @param {CarritoItemCreateArgs} args - Arguments to create a CarritoItem.
     * @example
     * // Create one CarritoItem
     * const CarritoItem = await prisma.carritoItem.create({
     *   data: {
     *     // ... data to create a CarritoItem
     *   }
     * })
     * 
     */
    create<T extends CarritoItemCreateArgs>(args: SelectSubset<T, CarritoItemCreateArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CarritoItems.
     * @param {CarritoItemCreateManyArgs} args - Arguments to create many CarritoItems.
     * @example
     * // Create many CarritoItems
     * const carritoItem = await prisma.carritoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarritoItemCreateManyArgs>(args?: SelectSubset<T, CarritoItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CarritoItems and returns the data saved in the database.
     * @param {CarritoItemCreateManyAndReturnArgs} args - Arguments to create many CarritoItems.
     * @example
     * // Create many CarritoItems
     * const carritoItem = await prisma.carritoItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CarritoItems and only return the `idProducto`
     * const carritoItemWithIdProductoOnly = await prisma.carritoItem.createManyAndReturn({
     *   select: { idProducto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarritoItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CarritoItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CarritoItem.
     * @param {CarritoItemDeleteArgs} args - Arguments to delete one CarritoItem.
     * @example
     * // Delete one CarritoItem
     * const CarritoItem = await prisma.carritoItem.delete({
     *   where: {
     *     // ... filter to delete one CarritoItem
     *   }
     * })
     * 
     */
    delete<T extends CarritoItemDeleteArgs>(args: SelectSubset<T, CarritoItemDeleteArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CarritoItem.
     * @param {CarritoItemUpdateArgs} args - Arguments to update one CarritoItem.
     * @example
     * // Update one CarritoItem
     * const carritoItem = await prisma.carritoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarritoItemUpdateArgs>(args: SelectSubset<T, CarritoItemUpdateArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CarritoItems.
     * @param {CarritoItemDeleteManyArgs} args - Arguments to filter CarritoItems to delete.
     * @example
     * // Delete a few CarritoItems
     * const { count } = await prisma.carritoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarritoItemDeleteManyArgs>(args?: SelectSubset<T, CarritoItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarritoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CarritoItems
     * const carritoItem = await prisma.carritoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarritoItemUpdateManyArgs>(args: SelectSubset<T, CarritoItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarritoItems and returns the data updated in the database.
     * @param {CarritoItemUpdateManyAndReturnArgs} args - Arguments to update many CarritoItems.
     * @example
     * // Update many CarritoItems
     * const carritoItem = await prisma.carritoItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CarritoItems and only return the `idProducto`
     * const carritoItemWithIdProductoOnly = await prisma.carritoItem.updateManyAndReturn({
     *   select: { idProducto: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CarritoItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CarritoItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CarritoItem.
     * @param {CarritoItemUpsertArgs} args - Arguments to update or create a CarritoItem.
     * @example
     * // Update or create a CarritoItem
     * const carritoItem = await prisma.carritoItem.upsert({
     *   create: {
     *     // ... data to create a CarritoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CarritoItem we want to update
     *   }
     * })
     */
    upsert<T extends CarritoItemUpsertArgs>(args: SelectSubset<T, CarritoItemUpsertArgs<ExtArgs>>): Prisma__CarritoItemClient<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CarritoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemCountArgs} args - Arguments to filter CarritoItems to count.
     * @example
     * // Count the number of CarritoItems
     * const count = await prisma.carritoItem.count({
     *   where: {
     *     // ... the filter for the CarritoItems we want to count
     *   }
     * })
    **/
    count<T extends CarritoItemCountArgs>(
      args?: Subset<T, CarritoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarritoItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CarritoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarritoItemAggregateArgs>(args: Subset<T, CarritoItemAggregateArgs>): Prisma.PrismaPromise<GetCarritoItemAggregateType<T>>

    /**
     * Group by CarritoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarritoItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarritoItemGroupByArgs['orderBy'] }
        : { orderBy?: CarritoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarritoItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarritoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CarritoItem model
   */
  readonly fields: CarritoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CarritoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarritoItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    carrito<T extends CarritoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CarritoDefaultArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CarritoItem model
   */
  interface CarritoItemFieldRefs {
    readonly idProducto: FieldRef<"CarritoItem", 'Int'>
    readonly idCarrito: FieldRef<"CarritoItem", 'Int'>
    readonly cantidad: FieldRef<"CarritoItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CarritoItem findUnique
   */
  export type CarritoItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * Filter, which CarritoItem to fetch.
     */
    where: CarritoItemWhereUniqueInput
  }

  /**
   * CarritoItem findUniqueOrThrow
   */
  export type CarritoItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * Filter, which CarritoItem to fetch.
     */
    where: CarritoItemWhereUniqueInput
  }

  /**
   * CarritoItem findFirst
   */
  export type CarritoItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * Filter, which CarritoItem to fetch.
     */
    where?: CarritoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarritoItems to fetch.
     */
    orderBy?: CarritoItemOrderByWithRelationInput | CarritoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarritoItems.
     */
    cursor?: CarritoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarritoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarritoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarritoItems.
     */
    distinct?: CarritoItemScalarFieldEnum | CarritoItemScalarFieldEnum[]
  }

  /**
   * CarritoItem findFirstOrThrow
   */
  export type CarritoItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * Filter, which CarritoItem to fetch.
     */
    where?: CarritoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarritoItems to fetch.
     */
    orderBy?: CarritoItemOrderByWithRelationInput | CarritoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarritoItems.
     */
    cursor?: CarritoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarritoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarritoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarritoItems.
     */
    distinct?: CarritoItemScalarFieldEnum | CarritoItemScalarFieldEnum[]
  }

  /**
   * CarritoItem findMany
   */
  export type CarritoItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * Filter, which CarritoItems to fetch.
     */
    where?: CarritoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarritoItems to fetch.
     */
    orderBy?: CarritoItemOrderByWithRelationInput | CarritoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CarritoItems.
     */
    cursor?: CarritoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarritoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarritoItems.
     */
    skip?: number
    distinct?: CarritoItemScalarFieldEnum | CarritoItemScalarFieldEnum[]
  }

  /**
   * CarritoItem create
   */
  export type CarritoItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CarritoItem.
     */
    data: XOR<CarritoItemCreateInput, CarritoItemUncheckedCreateInput>
  }

  /**
   * CarritoItem createMany
   */
  export type CarritoItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CarritoItems.
     */
    data: CarritoItemCreateManyInput | CarritoItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CarritoItem createManyAndReturn
   */
  export type CarritoItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * The data used to create many CarritoItems.
     */
    data: CarritoItemCreateManyInput | CarritoItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarritoItem update
   */
  export type CarritoItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CarritoItem.
     */
    data: XOR<CarritoItemUpdateInput, CarritoItemUncheckedUpdateInput>
    /**
     * Choose, which CarritoItem to update.
     */
    where: CarritoItemWhereUniqueInput
  }

  /**
   * CarritoItem updateMany
   */
  export type CarritoItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CarritoItems.
     */
    data: XOR<CarritoItemUpdateManyMutationInput, CarritoItemUncheckedUpdateManyInput>
    /**
     * Filter which CarritoItems to update
     */
    where?: CarritoItemWhereInput
    /**
     * Limit how many CarritoItems to update.
     */
    limit?: number
  }

  /**
   * CarritoItem updateManyAndReturn
   */
  export type CarritoItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * The data used to update CarritoItems.
     */
    data: XOR<CarritoItemUpdateManyMutationInput, CarritoItemUncheckedUpdateManyInput>
    /**
     * Filter which CarritoItems to update
     */
    where?: CarritoItemWhereInput
    /**
     * Limit how many CarritoItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarritoItem upsert
   */
  export type CarritoItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CarritoItem to update in case it exists.
     */
    where: CarritoItemWhereUniqueInput
    /**
     * In case the CarritoItem found by the `where` argument doesn't exist, create a new CarritoItem with this data.
     */
    create: XOR<CarritoItemCreateInput, CarritoItemUncheckedCreateInput>
    /**
     * In case the CarritoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarritoItemUpdateInput, CarritoItemUncheckedUpdateInput>
  }

  /**
   * CarritoItem delete
   */
  export type CarritoItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    /**
     * Filter which CarritoItem to delete.
     */
    where: CarritoItemWhereUniqueInput
  }

  /**
   * CarritoItem deleteMany
   */
  export type CarritoItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarritoItems to delete
     */
    where?: CarritoItemWhereInput
    /**
     * Limit how many CarritoItems to delete.
     */
    limit?: number
  }

  /**
   * CarritoItem without action
   */
  export type CarritoItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
  }


  /**
   * Model Carrito
   */

  export type AggregateCarrito = {
    _count: CarritoCountAggregateOutputType | null
    _avg: CarritoAvgAggregateOutputType | null
    _sum: CarritoSumAggregateOutputType | null
    _min: CarritoMinAggregateOutputType | null
    _max: CarritoMaxAggregateOutputType | null
  }

  export type CarritoAvgAggregateOutputType = {
    id: number | null
    total: Decimal | null
  }

  export type CarritoSumAggregateOutputType = {
    id: number | null
    total: Decimal | null
  }

  export type CarritoMinAggregateOutputType = {
    id: number | null
    total: Decimal | null
    moneda: $Enums.Moneda | null
    updatedAt: Date | null
  }

  export type CarritoMaxAggregateOutputType = {
    id: number | null
    total: Decimal | null
    moneda: $Enums.Moneda | null
    updatedAt: Date | null
  }

  export type CarritoCountAggregateOutputType = {
    id: number
    total: number
    moneda: number
    updatedAt: number
    _all: number
  }


  export type CarritoAvgAggregateInputType = {
    id?: true
    total?: true
  }

  export type CarritoSumAggregateInputType = {
    id?: true
    total?: true
  }

  export type CarritoMinAggregateInputType = {
    id?: true
    total?: true
    moneda?: true
    updatedAt?: true
  }

  export type CarritoMaxAggregateInputType = {
    id?: true
    total?: true
    moneda?: true
    updatedAt?: true
  }

  export type CarritoCountAggregateInputType = {
    id?: true
    total?: true
    moneda?: true
    updatedAt?: true
    _all?: true
  }

  export type CarritoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carrito to aggregate.
     */
    where?: CarritoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carritos to fetch.
     */
    orderBy?: CarritoOrderByWithRelationInput | CarritoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarritoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carritos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carritos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carritos
    **/
    _count?: true | CarritoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarritoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarritoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarritoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarritoMaxAggregateInputType
  }

  export type GetCarritoAggregateType<T extends CarritoAggregateArgs> = {
        [P in keyof T & keyof AggregateCarrito]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarrito[P]>
      : GetScalarType<T[P], AggregateCarrito[P]>
  }




  export type CarritoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarritoWhereInput
    orderBy?: CarritoOrderByWithAggregationInput | CarritoOrderByWithAggregationInput[]
    by: CarritoScalarFieldEnum[] | CarritoScalarFieldEnum
    having?: CarritoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarritoCountAggregateInputType | true
    _avg?: CarritoAvgAggregateInputType
    _sum?: CarritoSumAggregateInputType
    _min?: CarritoMinAggregateInputType
    _max?: CarritoMaxAggregateInputType
  }

  export type CarritoGroupByOutputType = {
    id: number
    total: Decimal
    moneda: $Enums.Moneda
    updatedAt: Date
    _count: CarritoCountAggregateOutputType | null
    _avg: CarritoAvgAggregateOutputType | null
    _sum: CarritoSumAggregateOutputType | null
    _min: CarritoMinAggregateOutputType | null
    _max: CarritoMaxAggregateOutputType | null
  }

  type GetCarritoGroupByPayload<T extends CarritoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarritoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarritoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarritoGroupByOutputType[P]>
            : GetScalarType<T[P], CarritoGroupByOutputType[P]>
        }
      >
    >


  export type CarritoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    total?: boolean
    moneda?: boolean
    updatedAt?: boolean
    items?: boolean | Carrito$itemsArgs<ExtArgs>
    _count?: boolean | CarritoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carrito"]>

  export type CarritoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    total?: boolean
    moneda?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["carrito"]>

  export type CarritoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    total?: boolean
    moneda?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["carrito"]>

  export type CarritoSelectScalar = {
    id?: boolean
    total?: boolean
    moneda?: boolean
    updatedAt?: boolean
  }

  export type CarritoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "total" | "moneda" | "updatedAt", ExtArgs["result"]["carrito"]>
  export type CarritoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Carrito$itemsArgs<ExtArgs>
    _count?: boolean | CarritoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CarritoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CarritoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CarritoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Carrito"
    objects: {
      items: Prisma.$CarritoItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      total: Prisma.Decimal
      moneda: $Enums.Moneda
      updatedAt: Date
    }, ExtArgs["result"]["carrito"]>
    composites: {}
  }

  type CarritoGetPayload<S extends boolean | null | undefined | CarritoDefaultArgs> = $Result.GetResult<Prisma.$CarritoPayload, S>

  type CarritoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarritoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarritoCountAggregateInputType | true
    }

  export interface CarritoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Carrito'], meta: { name: 'Carrito' } }
    /**
     * Find zero or one Carrito that matches the filter.
     * @param {CarritoFindUniqueArgs} args - Arguments to find a Carrito
     * @example
     * // Get one Carrito
     * const carrito = await prisma.carrito.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarritoFindUniqueArgs>(args: SelectSubset<T, CarritoFindUniqueArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Carrito that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarritoFindUniqueOrThrowArgs} args - Arguments to find a Carrito
     * @example
     * // Get one Carrito
     * const carrito = await prisma.carrito.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarritoFindUniqueOrThrowArgs>(args: SelectSubset<T, CarritoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carrito that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoFindFirstArgs} args - Arguments to find a Carrito
     * @example
     * // Get one Carrito
     * const carrito = await prisma.carrito.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarritoFindFirstArgs>(args?: SelectSubset<T, CarritoFindFirstArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carrito that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoFindFirstOrThrowArgs} args - Arguments to find a Carrito
     * @example
     * // Get one Carrito
     * const carrito = await prisma.carrito.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarritoFindFirstOrThrowArgs>(args?: SelectSubset<T, CarritoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carritos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carritos
     * const carritos = await prisma.carrito.findMany()
     * 
     * // Get first 10 Carritos
     * const carritos = await prisma.carrito.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carritoWithIdOnly = await prisma.carrito.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarritoFindManyArgs>(args?: SelectSubset<T, CarritoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Carrito.
     * @param {CarritoCreateArgs} args - Arguments to create a Carrito.
     * @example
     * // Create one Carrito
     * const Carrito = await prisma.carrito.create({
     *   data: {
     *     // ... data to create a Carrito
     *   }
     * })
     * 
     */
    create<T extends CarritoCreateArgs>(args: SelectSubset<T, CarritoCreateArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carritos.
     * @param {CarritoCreateManyArgs} args - Arguments to create many Carritos.
     * @example
     * // Create many Carritos
     * const carrito = await prisma.carrito.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarritoCreateManyArgs>(args?: SelectSubset<T, CarritoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carritos and returns the data saved in the database.
     * @param {CarritoCreateManyAndReturnArgs} args - Arguments to create many Carritos.
     * @example
     * // Create many Carritos
     * const carrito = await prisma.carrito.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carritos and only return the `id`
     * const carritoWithIdOnly = await prisma.carrito.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarritoCreateManyAndReturnArgs>(args?: SelectSubset<T, CarritoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Carrito.
     * @param {CarritoDeleteArgs} args - Arguments to delete one Carrito.
     * @example
     * // Delete one Carrito
     * const Carrito = await prisma.carrito.delete({
     *   where: {
     *     // ... filter to delete one Carrito
     *   }
     * })
     * 
     */
    delete<T extends CarritoDeleteArgs>(args: SelectSubset<T, CarritoDeleteArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Carrito.
     * @param {CarritoUpdateArgs} args - Arguments to update one Carrito.
     * @example
     * // Update one Carrito
     * const carrito = await prisma.carrito.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarritoUpdateArgs>(args: SelectSubset<T, CarritoUpdateArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carritos.
     * @param {CarritoDeleteManyArgs} args - Arguments to filter Carritos to delete.
     * @example
     * // Delete a few Carritos
     * const { count } = await prisma.carrito.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarritoDeleteManyArgs>(args?: SelectSubset<T, CarritoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carritos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carritos
     * const carrito = await prisma.carrito.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarritoUpdateManyArgs>(args: SelectSubset<T, CarritoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carritos and returns the data updated in the database.
     * @param {CarritoUpdateManyAndReturnArgs} args - Arguments to update many Carritos.
     * @example
     * // Update many Carritos
     * const carrito = await prisma.carrito.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Carritos and only return the `id`
     * const carritoWithIdOnly = await prisma.carrito.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CarritoUpdateManyAndReturnArgs>(args: SelectSubset<T, CarritoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Carrito.
     * @param {CarritoUpsertArgs} args - Arguments to update or create a Carrito.
     * @example
     * // Update or create a Carrito
     * const carrito = await prisma.carrito.upsert({
     *   create: {
     *     // ... data to create a Carrito
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Carrito we want to update
     *   }
     * })
     */
    upsert<T extends CarritoUpsertArgs>(args: SelectSubset<T, CarritoUpsertArgs<ExtArgs>>): Prisma__CarritoClient<$Result.GetResult<Prisma.$CarritoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carritos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoCountArgs} args - Arguments to filter Carritos to count.
     * @example
     * // Count the number of Carritos
     * const count = await prisma.carrito.count({
     *   where: {
     *     // ... the filter for the Carritos we want to count
     *   }
     * })
    **/
    count<T extends CarritoCountArgs>(
      args?: Subset<T, CarritoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarritoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Carrito.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarritoAggregateArgs>(args: Subset<T, CarritoAggregateArgs>): Prisma.PrismaPromise<GetCarritoAggregateType<T>>

    /**
     * Group by Carrito.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarritoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarritoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarritoGroupByArgs['orderBy'] }
        : { orderBy?: CarritoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarritoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarritoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Carrito model
   */
  readonly fields: CarritoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Carrito.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarritoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Carrito$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Carrito$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarritoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Carrito model
   */
  interface CarritoFieldRefs {
    readonly id: FieldRef<"Carrito", 'Int'>
    readonly total: FieldRef<"Carrito", 'Decimal'>
    readonly moneda: FieldRef<"Carrito", 'Moneda'>
    readonly updatedAt: FieldRef<"Carrito", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Carrito findUnique
   */
  export type CarritoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * Filter, which Carrito to fetch.
     */
    where: CarritoWhereUniqueInput
  }

  /**
   * Carrito findUniqueOrThrow
   */
  export type CarritoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * Filter, which Carrito to fetch.
     */
    where: CarritoWhereUniqueInput
  }

  /**
   * Carrito findFirst
   */
  export type CarritoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * Filter, which Carrito to fetch.
     */
    where?: CarritoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carritos to fetch.
     */
    orderBy?: CarritoOrderByWithRelationInput | CarritoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carritos.
     */
    cursor?: CarritoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carritos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carritos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carritos.
     */
    distinct?: CarritoScalarFieldEnum | CarritoScalarFieldEnum[]
  }

  /**
   * Carrito findFirstOrThrow
   */
  export type CarritoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * Filter, which Carrito to fetch.
     */
    where?: CarritoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carritos to fetch.
     */
    orderBy?: CarritoOrderByWithRelationInput | CarritoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carritos.
     */
    cursor?: CarritoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carritos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carritos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carritos.
     */
    distinct?: CarritoScalarFieldEnum | CarritoScalarFieldEnum[]
  }

  /**
   * Carrito findMany
   */
  export type CarritoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * Filter, which Carritos to fetch.
     */
    where?: CarritoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carritos to fetch.
     */
    orderBy?: CarritoOrderByWithRelationInput | CarritoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carritos.
     */
    cursor?: CarritoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carritos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carritos.
     */
    skip?: number
    distinct?: CarritoScalarFieldEnum | CarritoScalarFieldEnum[]
  }

  /**
   * Carrito create
   */
  export type CarritoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * The data needed to create a Carrito.
     */
    data: XOR<CarritoCreateInput, CarritoUncheckedCreateInput>
  }

  /**
   * Carrito createMany
   */
  export type CarritoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carritos.
     */
    data: CarritoCreateManyInput | CarritoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Carrito createManyAndReturn
   */
  export type CarritoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * The data used to create many Carritos.
     */
    data: CarritoCreateManyInput | CarritoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Carrito update
   */
  export type CarritoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * The data needed to update a Carrito.
     */
    data: XOR<CarritoUpdateInput, CarritoUncheckedUpdateInput>
    /**
     * Choose, which Carrito to update.
     */
    where: CarritoWhereUniqueInput
  }

  /**
   * Carrito updateMany
   */
  export type CarritoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carritos.
     */
    data: XOR<CarritoUpdateManyMutationInput, CarritoUncheckedUpdateManyInput>
    /**
     * Filter which Carritos to update
     */
    where?: CarritoWhereInput
    /**
     * Limit how many Carritos to update.
     */
    limit?: number
  }

  /**
   * Carrito updateManyAndReturn
   */
  export type CarritoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * The data used to update Carritos.
     */
    data: XOR<CarritoUpdateManyMutationInput, CarritoUncheckedUpdateManyInput>
    /**
     * Filter which Carritos to update
     */
    where?: CarritoWhereInput
    /**
     * Limit how many Carritos to update.
     */
    limit?: number
  }

  /**
   * Carrito upsert
   */
  export type CarritoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * The filter to search for the Carrito to update in case it exists.
     */
    where: CarritoWhereUniqueInput
    /**
     * In case the Carrito found by the `where` argument doesn't exist, create a new Carrito with this data.
     */
    create: XOR<CarritoCreateInput, CarritoUncheckedCreateInput>
    /**
     * In case the Carrito was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarritoUpdateInput, CarritoUncheckedUpdateInput>
  }

  /**
   * Carrito delete
   */
  export type CarritoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
    /**
     * Filter which Carrito to delete.
     */
    where: CarritoWhereUniqueInput
  }

  /**
   * Carrito deleteMany
   */
  export type CarritoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carritos to delete
     */
    where?: CarritoWhereInput
    /**
     * Limit how many Carritos to delete.
     */
    limit?: number
  }

  /**
   * Carrito.items
   */
  export type Carrito$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarritoItem
     */
    select?: CarritoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarritoItem
     */
    omit?: CarritoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoItemInclude<ExtArgs> | null
    where?: CarritoItemWhereInput
    orderBy?: CarritoItemOrderByWithRelationInput | CarritoItemOrderByWithRelationInput[]
    cursor?: CarritoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarritoItemScalarFieldEnum | CarritoItemScalarFieldEnum[]
  }

  /**
   * Carrito without action
   */
  export type CarritoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrito
     */
    select?: CarritoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrito
     */
    omit?: CarritoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarritoInclude<ExtArgs> | null
  }


  /**
   * Model Pago
   */

  export type AggregatePago = {
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  export type PagoAvgAggregateOutputType = {
    id: number | null
    idPedido: number | null
    monto: Decimal | null
  }

  export type PagoSumAggregateOutputType = {
    id: number | null
    idPedido: number | null
    monto: Decimal | null
  }

  export type PagoMinAggregateOutputType = {
    id: number | null
    idPedido: number | null
    pasarela: $Enums.PasarelaPago | null
    estado: $Enums.EstadoPago | null
    monto: Decimal | null
    moneda: $Enums.Moneda | null
    createdAt: Date | null
  }

  export type PagoMaxAggregateOutputType = {
    id: number | null
    idPedido: number | null
    pasarela: $Enums.PasarelaPago | null
    estado: $Enums.EstadoPago | null
    monto: Decimal | null
    moneda: $Enums.Moneda | null
    createdAt: Date | null
  }

  export type PagoCountAggregateOutputType = {
    id: number
    idPedido: number
    pasarela: number
    estado: number
    monto: number
    moneda: number
    createdAt: number
    _all: number
  }


  export type PagoAvgAggregateInputType = {
    id?: true
    idPedido?: true
    monto?: true
  }

  export type PagoSumAggregateInputType = {
    id?: true
    idPedido?: true
    monto?: true
  }

  export type PagoMinAggregateInputType = {
    id?: true
    idPedido?: true
    pasarela?: true
    estado?: true
    monto?: true
    moneda?: true
    createdAt?: true
  }

  export type PagoMaxAggregateInputType = {
    id?: true
    idPedido?: true
    pasarela?: true
    estado?: true
    monto?: true
    moneda?: true
    createdAt?: true
  }

  export type PagoCountAggregateInputType = {
    id?: true
    idPedido?: true
    pasarela?: true
    estado?: true
    monto?: true
    moneda?: true
    createdAt?: true
    _all?: true
  }

  export type PagoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pago to aggregate.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagos
    **/
    _count?: true | PagoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagoMaxAggregateInputType
  }

  export type GetPagoAggregateType<T extends PagoAggregateArgs> = {
        [P in keyof T & keyof AggregatePago]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePago[P]>
      : GetScalarType<T[P], AggregatePago[P]>
  }




  export type PagoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithAggregationInput | PagoOrderByWithAggregationInput[]
    by: PagoScalarFieldEnum[] | PagoScalarFieldEnum
    having?: PagoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagoCountAggregateInputType | true
    _avg?: PagoAvgAggregateInputType
    _sum?: PagoSumAggregateInputType
    _min?: PagoMinAggregateInputType
    _max?: PagoMaxAggregateInputType
  }

  export type PagoGroupByOutputType = {
    id: number
    idPedido: number
    pasarela: $Enums.PasarelaPago
    estado: $Enums.EstadoPago
    monto: Decimal
    moneda: $Enums.Moneda
    createdAt: Date
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  type GetPagoGroupByPayload<T extends PagoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagoGroupByOutputType[P]>
            : GetScalarType<T[P], PagoGroupByOutputType[P]>
        }
      >
    >


  export type PagoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPedido?: boolean
    pasarela?: boolean
    estado?: boolean
    monto?: boolean
    moneda?: boolean
    createdAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPedido?: boolean
    pasarela?: boolean
    estado?: boolean
    monto?: boolean
    moneda?: boolean
    createdAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPedido?: boolean
    pasarela?: boolean
    estado?: boolean
    monto?: boolean
    moneda?: boolean
    createdAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectScalar = {
    id?: boolean
    idPedido?: boolean
    pasarela?: boolean
    estado?: boolean
    monto?: boolean
    moneda?: boolean
    createdAt?: boolean
  }

  export type PagoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idPedido" | "pasarela" | "estado" | "monto" | "moneda" | "createdAt", ExtArgs["result"]["pago"]>
  export type PagoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PagoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PagoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }

  export type $PagoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pago"
    objects: {
      pedido: Prisma.$PedidoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      idPedido: number
      pasarela: $Enums.PasarelaPago
      estado: $Enums.EstadoPago
      monto: Prisma.Decimal
      moneda: $Enums.Moneda
      /**
       * *
       *    * preferenceId?: string;  // Mercado Pago
       *    * initPoint?: string;     // MP checkout URL
       *    * No sabemos que hacer todavia con esto ya que
       *    * lo vamos a conectar con MP
       */
      createdAt: Date
    }, ExtArgs["result"]["pago"]>
    composites: {}
  }

  type PagoGetPayload<S extends boolean | null | undefined | PagoDefaultArgs> = $Result.GetResult<Prisma.$PagoPayload, S>

  type PagoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PagoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagoCountAggregateInputType | true
    }

  export interface PagoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pago'], meta: { name: 'Pago' } }
    /**
     * Find zero or one Pago that matches the filter.
     * @param {PagoFindUniqueArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagoFindUniqueArgs>(args: SelectSubset<T, PagoFindUniqueArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pago that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PagoFindUniqueOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagoFindFirstArgs>(args?: SelectSubset<T, PagoFindFirstArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pago.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pago.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagoWithIdOnly = await prisma.pago.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagoFindManyArgs>(args?: SelectSubset<T, PagoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pago.
     * @param {PagoCreateArgs} args - Arguments to create a Pago.
     * @example
     * // Create one Pago
     * const Pago = await prisma.pago.create({
     *   data: {
     *     // ... data to create a Pago
     *   }
     * })
     * 
     */
    create<T extends PagoCreateArgs>(args: SelectSubset<T, PagoCreateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagos.
     * @param {PagoCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagoCreateManyArgs>(args?: SelectSubset<T, PagoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagos and returns the data saved in the database.
     * @param {PagoCreateManyAndReturnArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagoCreateManyAndReturnArgs>(args?: SelectSubset<T, PagoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pago.
     * @param {PagoDeleteArgs} args - Arguments to delete one Pago.
     * @example
     * // Delete one Pago
     * const Pago = await prisma.pago.delete({
     *   where: {
     *     // ... filter to delete one Pago
     *   }
     * })
     * 
     */
    delete<T extends PagoDeleteArgs>(args: SelectSubset<T, PagoDeleteArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pago.
     * @param {PagoUpdateArgs} args - Arguments to update one Pago.
     * @example
     * // Update one Pago
     * const pago = await prisma.pago.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagoUpdateArgs>(args: SelectSubset<T, PagoUpdateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagos.
     * @param {PagoDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pago.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagoDeleteManyArgs>(args?: SelectSubset<T, PagoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagoUpdateManyArgs>(args: SelectSubset<T, PagoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos and returns the data updated in the database.
     * @param {PagoUpdateManyAndReturnArgs} args - Arguments to update many Pagos.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PagoUpdateManyAndReturnArgs>(args: SelectSubset<T, PagoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pago.
     * @param {PagoUpsertArgs} args - Arguments to update or create a Pago.
     * @example
     * // Update or create a Pago
     * const pago = await prisma.pago.upsert({
     *   create: {
     *     // ... data to create a Pago
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pago we want to update
     *   }
     * })
     */
    upsert<T extends PagoUpsertArgs>(args: SelectSubset<T, PagoUpsertArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pago.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends PagoCountArgs>(
      args?: Subset<T, PagoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagoAggregateArgs>(args: Subset<T, PagoAggregateArgs>): Prisma.PrismaPromise<GetPagoAggregateType<T>>

    /**
     * Group by Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagoGroupByArgs['orderBy'] }
        : { orderBy?: PagoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pago model
   */
  readonly fields: PagoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pago.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pago model
   */
  interface PagoFieldRefs {
    readonly id: FieldRef<"Pago", 'Int'>
    readonly idPedido: FieldRef<"Pago", 'Int'>
    readonly pasarela: FieldRef<"Pago", 'PasarelaPago'>
    readonly estado: FieldRef<"Pago", 'EstadoPago'>
    readonly monto: FieldRef<"Pago", 'Decimal'>
    readonly moneda: FieldRef<"Pago", 'Moneda'>
    readonly createdAt: FieldRef<"Pago", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pago findUnique
   */
  export type PagoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findUniqueOrThrow
   */
  export type PagoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findFirst
   */
  export type PagoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findFirstOrThrow
   */
  export type PagoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findMany
   */
  export type PagoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pagos to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago create
   */
  export type PagoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pago.
     */
    data: XOR<PagoCreateInput, PagoUncheckedCreateInput>
  }

  /**
   * Pago createMany
   */
  export type PagoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pago createManyAndReturn
   */
  export type PagoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago update
   */
  export type PagoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pago.
     */
    data: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
    /**
     * Choose, which Pago to update.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago updateMany
   */
  export type PagoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
  }

  /**
   * Pago updateManyAndReturn
   */
  export type PagoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago upsert
   */
  export type PagoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pago to update in case it exists.
     */
    where: PagoWhereUniqueInput
    /**
     * In case the Pago found by the `where` argument doesn't exist, create a new Pago with this data.
     */
    create: XOR<PagoCreateInput, PagoUncheckedCreateInput>
    /**
     * In case the Pago was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
  }

  /**
   * Pago delete
   */
  export type PagoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter which Pago to delete.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago deleteMany
   */
  export type PagoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagos to delete
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to delete.
     */
    limit?: number
  }

  /**
   * Pago without action
   */
  export type PagoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    username: 'username',
    mail: 'mail',
    passwordHash: 'passwordHash',
    rol: 'rol',
    createdAt: 'createdAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const AdminProfileScalarFieldEnum: {
    idAdmin: 'idAdmin',
    idUsuario: 'idUsuario',
    nombre: 'nombre',
    email: 'email',
    telefono: 'telefono',
    activo: 'activo',
    createdAt: 'createdAt'
  };

  export type AdminProfileScalarFieldEnum = (typeof AdminProfileScalarFieldEnum)[keyof typeof AdminProfileScalarFieldEnum]


  export const ProductoScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descripcion: 'descripcion',
    precio: 'precio',
    cobertura: 'cobertura',
    tipo: 'tipo',
    isActive: 'isActive',
    createdAt: 'createdAt',
    imagenUrl: 'imagenUrl'
  };

  export type ProductoScalarFieldEnum = (typeof ProductoScalarFieldEnum)[keyof typeof ProductoScalarFieldEnum]


  export const PolizaScalarFieldEnum: {
    id: 'id',
    idPedido: 'idPedido',
    archivoUrl: 'archivoUrl',
    estado: 'estado',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PolizaScalarFieldEnum = (typeof PolizaScalarFieldEnum)[keyof typeof PolizaScalarFieldEnum]


  export const PedidoItemScalarFieldEnum: {
    idProducto: 'idProducto',
    idPedido: 'idPedido',
    titulo: 'titulo',
    precio: 'precio',
    cantidad: 'cantidad'
  };

  export type PedidoItemScalarFieldEnum = (typeof PedidoItemScalarFieldEnum)[keyof typeof PedidoItemScalarFieldEnum]


  export const PedidoScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    subtotal: 'subtotal',
    total: 'total',
    moneda: 'moneda',
    estado: 'estado',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PedidoScalarFieldEnum = (typeof PedidoScalarFieldEnum)[keyof typeof PedidoScalarFieldEnum]


  export const CarritoItemScalarFieldEnum: {
    idProducto: 'idProducto',
    idCarrito: 'idCarrito',
    cantidad: 'cantidad'
  };

  export type CarritoItemScalarFieldEnum = (typeof CarritoItemScalarFieldEnum)[keyof typeof CarritoItemScalarFieldEnum]


  export const CarritoScalarFieldEnum: {
    id: 'id',
    total: 'total',
    moneda: 'moneda',
    updatedAt: 'updatedAt'
  };

  export type CarritoScalarFieldEnum = (typeof CarritoScalarFieldEnum)[keyof typeof CarritoScalarFieldEnum]


  export const PagoScalarFieldEnum: {
    id: 'id',
    idPedido: 'idPedido',
    pasarela: 'pasarela',
    estado: 'estado',
    monto: 'monto',
    moneda: 'moneda',
    createdAt: 'createdAt'
  };

  export type PagoScalarFieldEnum = (typeof PagoScalarFieldEnum)[keyof typeof PagoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'RolUsuario'
   */
  export type EnumRolUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RolUsuario'>
    


  /**
   * Reference to a field of type 'RolUsuario[]'
   */
  export type ListEnumRolUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RolUsuario[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TipoSeguro'
   */
  export type EnumTipoSeguroFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoSeguro'>
    


  /**
   * Reference to a field of type 'TipoSeguro[]'
   */
  export type ListEnumTipoSeguroFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoSeguro[]'>
    


  /**
   * Reference to a field of type 'EstadoPoliza'
   */
  export type EnumEstadoPolizaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPoliza'>
    


  /**
   * Reference to a field of type 'EstadoPoliza[]'
   */
  export type ListEnumEstadoPolizaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPoliza[]'>
    


  /**
   * Reference to a field of type 'Moneda'
   */
  export type EnumMonedaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Moneda'>
    


  /**
   * Reference to a field of type 'Moneda[]'
   */
  export type ListEnumMonedaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Moneda[]'>
    


  /**
   * Reference to a field of type 'EstadoPedido'
   */
  export type EnumEstadoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPedido'>
    


  /**
   * Reference to a field of type 'EstadoPedido[]'
   */
  export type ListEnumEstadoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPedido[]'>
    


  /**
   * Reference to a field of type 'PasarelaPago'
   */
  export type EnumPasarelaPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PasarelaPago'>
    


  /**
   * Reference to a field of type 'PasarelaPago[]'
   */
  export type ListEnumPasarelaPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PasarelaPago[]'>
    


  /**
   * Reference to a field of type 'EstadoPago'
   */
  export type EnumEstadoPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPago'>
    


  /**
   * Reference to a field of type 'EstadoPago[]'
   */
  export type ListEnumEstadoPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPago[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    username?: StringFilter<"Usuario"> | string
    mail?: StringFilter<"Usuario"> | string
    passwordHash?: StringFilter<"Usuario"> | string
    rol?: EnumRolUsuarioFilter<"Usuario"> | $Enums.RolUsuario
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    adminProfile?: XOR<AdminProfileNullableScalarRelationFilter, AdminProfileWhereInput> | null
    pedidos?: PedidoListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    mail?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    createdAt?: SortOrder
    adminProfile?: AdminProfileOrderByWithRelationInput
    pedidos?: PedidoOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    mail?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    passwordHash?: StringFilter<"Usuario"> | string
    rol?: EnumRolUsuarioFilter<"Usuario"> | $Enums.RolUsuario
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    adminProfile?: XOR<AdminProfileNullableScalarRelationFilter, AdminProfileWhereInput> | null
    pedidos?: PedidoListRelationFilter
  }, "id" | "username" | "mail">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    mail?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    createdAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    username?: StringWithAggregatesFilter<"Usuario"> | string
    mail?: StringWithAggregatesFilter<"Usuario"> | string
    passwordHash?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: EnumRolUsuarioWithAggregatesFilter<"Usuario"> | $Enums.RolUsuario
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type AdminProfileWhereInput = {
    AND?: AdminProfileWhereInput | AdminProfileWhereInput[]
    OR?: AdminProfileWhereInput[]
    NOT?: AdminProfileWhereInput | AdminProfileWhereInput[]
    idAdmin?: IntFilter<"AdminProfile"> | number
    idUsuario?: IntFilter<"AdminProfile"> | number
    nombre?: StringFilter<"AdminProfile"> | string
    email?: StringFilter<"AdminProfile"> | string
    telefono?: StringNullableFilter<"AdminProfile"> | string | null
    activo?: BoolFilter<"AdminProfile"> | boolean
    createdAt?: DateTimeFilter<"AdminProfile"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type AdminProfileOrderByWithRelationInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type AdminProfileWhereUniqueInput = Prisma.AtLeast<{
    idAdmin?: number
    idUsuario?: number
    email?: string
    AND?: AdminProfileWhereInput | AdminProfileWhereInput[]
    OR?: AdminProfileWhereInput[]
    NOT?: AdminProfileWhereInput | AdminProfileWhereInput[]
    nombre?: StringFilter<"AdminProfile"> | string
    telefono?: StringNullableFilter<"AdminProfile"> | string | null
    activo?: BoolFilter<"AdminProfile"> | boolean
    createdAt?: DateTimeFilter<"AdminProfile"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "idAdmin" | "idUsuario" | "email">

  export type AdminProfileOrderByWithAggregationInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    _count?: AdminProfileCountOrderByAggregateInput
    _avg?: AdminProfileAvgOrderByAggregateInput
    _max?: AdminProfileMaxOrderByAggregateInput
    _min?: AdminProfileMinOrderByAggregateInput
    _sum?: AdminProfileSumOrderByAggregateInput
  }

  export type AdminProfileScalarWhereWithAggregatesInput = {
    AND?: AdminProfileScalarWhereWithAggregatesInput | AdminProfileScalarWhereWithAggregatesInput[]
    OR?: AdminProfileScalarWhereWithAggregatesInput[]
    NOT?: AdminProfileScalarWhereWithAggregatesInput | AdminProfileScalarWhereWithAggregatesInput[]
    idAdmin?: IntWithAggregatesFilter<"AdminProfile"> | number
    idUsuario?: IntWithAggregatesFilter<"AdminProfile"> | number
    nombre?: StringWithAggregatesFilter<"AdminProfile"> | string
    email?: StringWithAggregatesFilter<"AdminProfile"> | string
    telefono?: StringNullableWithAggregatesFilter<"AdminProfile"> | string | null
    activo?: BoolWithAggregatesFilter<"AdminProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AdminProfile"> | Date | string
  }

  export type ProductoWhereInput = {
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    id?: IntFilter<"Producto"> | number
    titulo?: StringFilter<"Producto"> | string
    descripcion?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    cobertura?: StringFilter<"Producto"> | string
    tipo?: EnumTipoSeguroFilter<"Producto"> | $Enums.TipoSeguro
    isActive?: BoolFilter<"Producto"> | boolean
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    imagenUrl?: StringNullableFilter<"Producto"> | string | null
    itemsPedido?: PedidoItemListRelationFilter
    itemsCarrito?: CarritoItemListRelationFilter
  }

  export type ProductoOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    cobertura?: SortOrder
    tipo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    imagenUrl?: SortOrderInput | SortOrder
    itemsPedido?: PedidoItemOrderByRelationAggregateInput
    itemsCarrito?: CarritoItemOrderByRelationAggregateInput
  }

  export type ProductoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    titulo?: StringFilter<"Producto"> | string
    descripcion?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    cobertura?: StringFilter<"Producto"> | string
    tipo?: EnumTipoSeguroFilter<"Producto"> | $Enums.TipoSeguro
    isActive?: BoolFilter<"Producto"> | boolean
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    imagenUrl?: StringNullableFilter<"Producto"> | string | null
    itemsPedido?: PedidoItemListRelationFilter
    itemsCarrito?: CarritoItemListRelationFilter
  }, "id">

  export type ProductoOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    cobertura?: SortOrder
    tipo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    imagenUrl?: SortOrderInput | SortOrder
    _count?: ProductoCountOrderByAggregateInput
    _avg?: ProductoAvgOrderByAggregateInput
    _max?: ProductoMaxOrderByAggregateInput
    _min?: ProductoMinOrderByAggregateInput
    _sum?: ProductoSumOrderByAggregateInput
  }

  export type ProductoScalarWhereWithAggregatesInput = {
    AND?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    OR?: ProductoScalarWhereWithAggregatesInput[]
    NOT?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Producto"> | number
    titulo?: StringWithAggregatesFilter<"Producto"> | string
    descripcion?: StringWithAggregatesFilter<"Producto"> | string
    precio?: DecimalWithAggregatesFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    cobertura?: StringWithAggregatesFilter<"Producto"> | string
    tipo?: EnumTipoSeguroWithAggregatesFilter<"Producto"> | $Enums.TipoSeguro
    isActive?: BoolWithAggregatesFilter<"Producto"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Producto"> | Date | string
    imagenUrl?: StringNullableWithAggregatesFilter<"Producto"> | string | null
  }

  export type PolizaWhereInput = {
    AND?: PolizaWhereInput | PolizaWhereInput[]
    OR?: PolizaWhereInput[]
    NOT?: PolizaWhereInput | PolizaWhereInput[]
    id?: IntFilter<"Poliza"> | number
    idPedido?: IntFilter<"Poliza"> | number
    archivoUrl?: StringFilter<"Poliza"> | string
    estado?: EnumEstadoPolizaFilter<"Poliza"> | $Enums.EstadoPoliza
    createdAt?: DateTimeFilter<"Poliza"> | Date | string
    updatedAt?: DateTimeFilter<"Poliza"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }

  export type PolizaOrderByWithRelationInput = {
    id?: SortOrder
    idPedido?: SortOrder
    archivoUrl?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pedido?: PedidoOrderByWithRelationInput
  }

  export type PolizaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    idPedido?: number
    AND?: PolizaWhereInput | PolizaWhereInput[]
    OR?: PolizaWhereInput[]
    NOT?: PolizaWhereInput | PolizaWhereInput[]
    archivoUrl?: StringFilter<"Poliza"> | string
    estado?: EnumEstadoPolizaFilter<"Poliza"> | $Enums.EstadoPoliza
    createdAt?: DateTimeFilter<"Poliza"> | Date | string
    updatedAt?: DateTimeFilter<"Poliza"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }, "id" | "idPedido">

  export type PolizaOrderByWithAggregationInput = {
    id?: SortOrder
    idPedido?: SortOrder
    archivoUrl?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PolizaCountOrderByAggregateInput
    _avg?: PolizaAvgOrderByAggregateInput
    _max?: PolizaMaxOrderByAggregateInput
    _min?: PolizaMinOrderByAggregateInput
    _sum?: PolizaSumOrderByAggregateInput
  }

  export type PolizaScalarWhereWithAggregatesInput = {
    AND?: PolizaScalarWhereWithAggregatesInput | PolizaScalarWhereWithAggregatesInput[]
    OR?: PolizaScalarWhereWithAggregatesInput[]
    NOT?: PolizaScalarWhereWithAggregatesInput | PolizaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Poliza"> | number
    idPedido?: IntWithAggregatesFilter<"Poliza"> | number
    archivoUrl?: StringWithAggregatesFilter<"Poliza"> | string
    estado?: EnumEstadoPolizaWithAggregatesFilter<"Poliza"> | $Enums.EstadoPoliza
    createdAt?: DateTimeWithAggregatesFilter<"Poliza"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Poliza"> | Date | string
  }

  export type PedidoItemWhereInput = {
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[]
    OR?: PedidoItemWhereInput[]
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[]
    idProducto?: IntFilter<"PedidoItem"> | number
    idPedido?: IntFilter<"PedidoItem"> | number
    titulo?: StringFilter<"PedidoItem"> | string
    precio?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    cantidad?: IntFilter<"PedidoItem"> | number
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }

  export type PedidoItemOrderByWithRelationInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    titulo?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
    producto?: ProductoOrderByWithRelationInput
    pedido?: PedidoOrderByWithRelationInput
  }

  export type PedidoItemWhereUniqueInput = Prisma.AtLeast<{
    idPedido_idProducto?: PedidoItemIdPedidoIdProductoCompoundUniqueInput
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[]
    OR?: PedidoItemWhereInput[]
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[]
    idProducto?: IntFilter<"PedidoItem"> | number
    idPedido?: IntFilter<"PedidoItem"> | number
    titulo?: StringFilter<"PedidoItem"> | string
    precio?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    cantidad?: IntFilter<"PedidoItem"> | number
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }, "idPedido_idProducto">

  export type PedidoItemOrderByWithAggregationInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    titulo?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
    _count?: PedidoItemCountOrderByAggregateInput
    _avg?: PedidoItemAvgOrderByAggregateInput
    _max?: PedidoItemMaxOrderByAggregateInput
    _min?: PedidoItemMinOrderByAggregateInput
    _sum?: PedidoItemSumOrderByAggregateInput
  }

  export type PedidoItemScalarWhereWithAggregatesInput = {
    AND?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[]
    OR?: PedidoItemScalarWhereWithAggregatesInput[]
    NOT?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[]
    idProducto?: IntWithAggregatesFilter<"PedidoItem"> | number
    idPedido?: IntWithAggregatesFilter<"PedidoItem"> | number
    titulo?: StringWithAggregatesFilter<"PedidoItem"> | string
    precio?: DecimalWithAggregatesFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    cantidad?: IntWithAggregatesFilter<"PedidoItem"> | number
  }

  export type PedidoWhereInput = {
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    id?: IntFilter<"Pedido"> | number
    idUsuario?: IntFilter<"Pedido"> | number
    subtotal?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Pedido"> | $Enums.Moneda
    estado?: EnumEstadoPedidoFilter<"Pedido"> | $Enums.EstadoPedido
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    items?: PedidoItemListRelationFilter
    poliza?: XOR<PolizaNullableScalarRelationFilter, PolizaWhereInput> | null
    pago?: XOR<PagoNullableScalarRelationFilter, PagoWhereInput> | null
  }

  export type PedidoOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    items?: PedidoItemOrderByRelationAggregateInput
    poliza?: PolizaOrderByWithRelationInput
    pago?: PagoOrderByWithRelationInput
  }

  export type PedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    idUsuario?: IntFilter<"Pedido"> | number
    subtotal?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Pedido"> | $Enums.Moneda
    estado?: EnumEstadoPedidoFilter<"Pedido"> | $Enums.EstadoPedido
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    items?: PedidoItemListRelationFilter
    poliza?: XOR<PolizaNullableScalarRelationFilter, PolizaWhereInput> | null
    pago?: XOR<PagoNullableScalarRelationFilter, PagoWhereInput> | null
  }, "id">

  export type PedidoOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PedidoCountOrderByAggregateInput
    _avg?: PedidoAvgOrderByAggregateInput
    _max?: PedidoMaxOrderByAggregateInput
    _min?: PedidoMinOrderByAggregateInput
    _sum?: PedidoSumOrderByAggregateInput
  }

  export type PedidoScalarWhereWithAggregatesInput = {
    AND?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    OR?: PedidoScalarWhereWithAggregatesInput[]
    NOT?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pedido"> | number
    idUsuario?: IntWithAggregatesFilter<"Pedido"> | number
    subtotal?: DecimalWithAggregatesFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    total?: DecimalWithAggregatesFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaWithAggregatesFilter<"Pedido"> | $Enums.Moneda
    estado?: EnumEstadoPedidoWithAggregatesFilter<"Pedido"> | $Enums.EstadoPedido
    createdAt?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
  }

  export type CarritoItemWhereInput = {
    AND?: CarritoItemWhereInput | CarritoItemWhereInput[]
    OR?: CarritoItemWhereInput[]
    NOT?: CarritoItemWhereInput | CarritoItemWhereInput[]
    idProducto?: IntFilter<"CarritoItem"> | number
    idCarrito?: IntFilter<"CarritoItem"> | number
    cantidad?: IntFilter<"CarritoItem"> | number
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    carrito?: XOR<CarritoScalarRelationFilter, CarritoWhereInput>
  }

  export type CarritoItemOrderByWithRelationInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
    producto?: ProductoOrderByWithRelationInput
    carrito?: CarritoOrderByWithRelationInput
  }

  export type CarritoItemWhereUniqueInput = Prisma.AtLeast<{
    idCarrito_idProducto?: CarritoItemIdCarritoIdProductoCompoundUniqueInput
    AND?: CarritoItemWhereInput | CarritoItemWhereInput[]
    OR?: CarritoItemWhereInput[]
    NOT?: CarritoItemWhereInput | CarritoItemWhereInput[]
    idProducto?: IntFilter<"CarritoItem"> | number
    idCarrito?: IntFilter<"CarritoItem"> | number
    cantidad?: IntFilter<"CarritoItem"> | number
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    carrito?: XOR<CarritoScalarRelationFilter, CarritoWhereInput>
  }, "idCarrito_idProducto">

  export type CarritoItemOrderByWithAggregationInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
    _count?: CarritoItemCountOrderByAggregateInput
    _avg?: CarritoItemAvgOrderByAggregateInput
    _max?: CarritoItemMaxOrderByAggregateInput
    _min?: CarritoItemMinOrderByAggregateInput
    _sum?: CarritoItemSumOrderByAggregateInput
  }

  export type CarritoItemScalarWhereWithAggregatesInput = {
    AND?: CarritoItemScalarWhereWithAggregatesInput | CarritoItemScalarWhereWithAggregatesInput[]
    OR?: CarritoItemScalarWhereWithAggregatesInput[]
    NOT?: CarritoItemScalarWhereWithAggregatesInput | CarritoItemScalarWhereWithAggregatesInput[]
    idProducto?: IntWithAggregatesFilter<"CarritoItem"> | number
    idCarrito?: IntWithAggregatesFilter<"CarritoItem"> | number
    cantidad?: IntWithAggregatesFilter<"CarritoItem"> | number
  }

  export type CarritoWhereInput = {
    AND?: CarritoWhereInput | CarritoWhereInput[]
    OR?: CarritoWhereInput[]
    NOT?: CarritoWhereInput | CarritoWhereInput[]
    id?: IntFilter<"Carrito"> | number
    total?: DecimalFilter<"Carrito"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Carrito"> | $Enums.Moneda
    updatedAt?: DateTimeFilter<"Carrito"> | Date | string
    items?: CarritoItemListRelationFilter
  }

  export type CarritoOrderByWithRelationInput = {
    id?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    updatedAt?: SortOrder
    items?: CarritoItemOrderByRelationAggregateInput
  }

  export type CarritoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CarritoWhereInput | CarritoWhereInput[]
    OR?: CarritoWhereInput[]
    NOT?: CarritoWhereInput | CarritoWhereInput[]
    total?: DecimalFilter<"Carrito"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Carrito"> | $Enums.Moneda
    updatedAt?: DateTimeFilter<"Carrito"> | Date | string
    items?: CarritoItemListRelationFilter
  }, "id">

  export type CarritoOrderByWithAggregationInput = {
    id?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    updatedAt?: SortOrder
    _count?: CarritoCountOrderByAggregateInput
    _avg?: CarritoAvgOrderByAggregateInput
    _max?: CarritoMaxOrderByAggregateInput
    _min?: CarritoMinOrderByAggregateInput
    _sum?: CarritoSumOrderByAggregateInput
  }

  export type CarritoScalarWhereWithAggregatesInput = {
    AND?: CarritoScalarWhereWithAggregatesInput | CarritoScalarWhereWithAggregatesInput[]
    OR?: CarritoScalarWhereWithAggregatesInput[]
    NOT?: CarritoScalarWhereWithAggregatesInput | CarritoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Carrito"> | number
    total?: DecimalWithAggregatesFilter<"Carrito"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaWithAggregatesFilter<"Carrito"> | $Enums.Moneda
    updatedAt?: DateTimeWithAggregatesFilter<"Carrito"> | Date | string
  }

  export type PagoWhereInput = {
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    id?: IntFilter<"Pago"> | number
    idPedido?: IntFilter<"Pago"> | number
    pasarela?: EnumPasarelaPagoFilter<"Pago"> | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFilter<"Pago"> | $Enums.EstadoPago
    monto?: DecimalFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Pago"> | $Enums.Moneda
    createdAt?: DateTimeFilter<"Pago"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }

  export type PagoOrderByWithRelationInput = {
    id?: SortOrder
    idPedido?: SortOrder
    pasarela?: SortOrder
    estado?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    createdAt?: SortOrder
    pedido?: PedidoOrderByWithRelationInput
  }

  export type PagoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    idPedido?: number
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    pasarela?: EnumPasarelaPagoFilter<"Pago"> | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFilter<"Pago"> | $Enums.EstadoPago
    monto?: DecimalFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Pago"> | $Enums.Moneda
    createdAt?: DateTimeFilter<"Pago"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }, "id" | "idPedido">

  export type PagoOrderByWithAggregationInput = {
    id?: SortOrder
    idPedido?: SortOrder
    pasarela?: SortOrder
    estado?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    createdAt?: SortOrder
    _count?: PagoCountOrderByAggregateInput
    _avg?: PagoAvgOrderByAggregateInput
    _max?: PagoMaxOrderByAggregateInput
    _min?: PagoMinOrderByAggregateInput
    _sum?: PagoSumOrderByAggregateInput
  }

  export type PagoScalarWhereWithAggregatesInput = {
    AND?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    OR?: PagoScalarWhereWithAggregatesInput[]
    NOT?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pago"> | number
    idPedido?: IntWithAggregatesFilter<"Pago"> | number
    pasarela?: EnumPasarelaPagoWithAggregatesFilter<"Pago"> | $Enums.PasarelaPago
    estado?: EnumEstadoPagoWithAggregatesFilter<"Pago"> | $Enums.EstadoPago
    monto?: DecimalWithAggregatesFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaWithAggregatesFilter<"Pago"> | $Enums.Moneda
    createdAt?: DateTimeWithAggregatesFilter<"Pago"> | Date | string
  }

  export type UsuarioCreateInput = {
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
    adminProfile?: AdminProfileCreateNestedOneWithoutUsuarioInput
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUsuarioInput
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminProfile?: AdminProfileUpdateOneWithoutUsuarioNestedInput
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUsuarioNestedInput
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileCreateInput = {
    nombre: string
    email: string
    telefono?: string | null
    activo: boolean
    createdAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutAdminProfileInput
  }

  export type AdminProfileUncheckedCreateInput = {
    idAdmin?: number
    idUsuario: number
    nombre: string
    email: string
    telefono?: string | null
    activo: boolean
    createdAt?: Date | string
  }

  export type AdminProfileUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutAdminProfileNestedInput
  }

  export type AdminProfileUncheckedUpdateInput = {
    idAdmin?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileCreateManyInput = {
    idAdmin?: number
    idUsuario: number
    nombre: string
    email: string
    telefono?: string | null
    activo: boolean
    createdAt?: Date | string
  }

  export type AdminProfileUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUncheckedUpdateManyInput = {
    idAdmin?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateInput = {
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
    itemsPedido?: PedidoItemCreateNestedManyWithoutProductoInput
    itemsCarrito?: CarritoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateInput = {
    id?: number
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
    itemsPedido?: PedidoItemUncheckedCreateNestedManyWithoutProductoInput
    itemsCarrito?: CarritoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    itemsPedido?: PedidoItemUpdateManyWithoutProductoNestedInput
    itemsCarrito?: CarritoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    itemsPedido?: PedidoItemUncheckedUpdateManyWithoutProductoNestedInput
    itemsCarrito?: CarritoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateManyInput = {
    id?: number
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
  }

  export type ProductoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PolizaCreateInput = {
    archivoUrl: string
    estado?: $Enums.EstadoPoliza
    createdAt?: Date | string
    updatedAt?: Date | string
    pedido: PedidoCreateNestedOneWithoutPolizaInput
  }

  export type PolizaUncheckedCreateInput = {
    id?: number
    idPedido: number
    archivoUrl: string
    estado?: $Enums.EstadoPoliza
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PolizaUpdateInput = {
    archivoUrl?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPolizaFieldUpdateOperationsInput | $Enums.EstadoPoliza
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedido?: PedidoUpdateOneRequiredWithoutPolizaNestedInput
  }

  export type PolizaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    archivoUrl?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPolizaFieldUpdateOperationsInput | $Enums.EstadoPoliza
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolizaCreateManyInput = {
    id?: number
    idPedido: number
    archivoUrl: string
    estado?: $Enums.EstadoPoliza
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PolizaUpdateManyMutationInput = {
    archivoUrl?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPolizaFieldUpdateOperationsInput | $Enums.EstadoPoliza
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolizaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    archivoUrl?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPolizaFieldUpdateOperationsInput | $Enums.EstadoPoliza
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoItemCreateInput = {
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
    producto: ProductoCreateNestedOneWithoutItemsPedidoInput
    pedido: PedidoCreateNestedOneWithoutItemsInput
  }

  export type PedidoItemUncheckedCreateInput = {
    idProducto: number
    idPedido: number
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
  }

  export type PedidoItemUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
    producto?: ProductoUpdateOneRequiredWithoutItemsPedidoNestedInput
    pedido?: PedidoUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PedidoItemUncheckedUpdateInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoItemCreateManyInput = {
    idProducto: number
    idPedido: number
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
  }

  export type PedidoItemUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoItemUncheckedUpdateManyInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoCreateInput = {
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPedidosInput
    items?: PedidoItemCreateNestedManyWithoutPedidoInput
    poliza?: PolizaCreateNestedOneWithoutPedidoInput
    pago?: PagoCreateNestedOneWithoutPedidoInput
  }

  export type PedidoUncheckedCreateInput = {
    id?: number
    idUsuario: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    poliza?: PolizaUncheckedCreateNestedOneWithoutPedidoInput
    pago?: PagoUncheckedCreateNestedOneWithoutPedidoInput
  }

  export type PedidoUpdateInput = {
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput
    items?: PedidoItemUpdateManyWithoutPedidoNestedInput
    poliza?: PolizaUpdateOneWithoutPedidoNestedInput
    pago?: PagoUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    poliza?: PolizaUncheckedUpdateOneWithoutPedidoNestedInput
    pago?: PagoUncheckedUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoCreateManyInput = {
    id?: number
    idUsuario: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoUpdateManyMutationInput = {
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarritoItemCreateInput = {
    cantidad?: number
    producto: ProductoCreateNestedOneWithoutItemsCarritoInput
    carrito: CarritoCreateNestedOneWithoutItemsInput
  }

  export type CarritoItemUncheckedCreateInput = {
    idProducto: number
    idCarrito: number
    cantidad?: number
  }

  export type CarritoItemUpdateInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    producto?: ProductoUpdateOneRequiredWithoutItemsCarritoNestedInput
    carrito?: CarritoUpdateOneRequiredWithoutItemsNestedInput
  }

  export type CarritoItemUncheckedUpdateInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    idCarrito?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoItemCreateManyInput = {
    idProducto: number
    idCarrito: number
    cantidad?: number
  }

  export type CarritoItemUpdateManyMutationInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoItemUncheckedUpdateManyInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    idCarrito?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoCreateInput = {
    total?: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    updatedAt?: Date | string
    items?: CarritoItemCreateNestedManyWithoutCarritoInput
  }

  export type CarritoUncheckedCreateInput = {
    id?: number
    total?: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    updatedAt?: Date | string
    items?: CarritoItemUncheckedCreateNestedManyWithoutCarritoInput
  }

  export type CarritoUpdateInput = {
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CarritoItemUpdateManyWithoutCarritoNestedInput
  }

  export type CarritoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CarritoItemUncheckedUpdateManyWithoutCarritoNestedInput
  }

  export type CarritoCreateManyInput = {
    id?: number
    total?: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    updatedAt?: Date | string
  }

  export type CarritoUpdateManyMutationInput = {
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarritoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoCreateInput = {
    pasarela: $Enums.PasarelaPago
    estado: $Enums.EstadoPago
    monto: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    createdAt?: Date | string
    pedido: PedidoCreateNestedOneWithoutPagoInput
  }

  export type PagoUncheckedCreateInput = {
    id?: number
    idPedido: number
    pasarela: $Enums.PasarelaPago
    estado: $Enums.EstadoPago
    monto: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    createdAt?: Date | string
  }

  export type PagoUpdateInput = {
    pasarela?: EnumPasarelaPagoFieldUpdateOperationsInput | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFieldUpdateOperationsInput | $Enums.EstadoPago
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedido?: PedidoUpdateOneRequiredWithoutPagoNestedInput
  }

  export type PagoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    pasarela?: EnumPasarelaPagoFieldUpdateOperationsInput | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFieldUpdateOperationsInput | $Enums.EstadoPago
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoCreateManyInput = {
    id?: number
    idPedido: number
    pasarela: $Enums.PasarelaPago
    estado: $Enums.EstadoPago
    monto: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    createdAt?: Date | string
  }

  export type PagoUpdateManyMutationInput = {
    pasarela?: EnumPasarelaPagoFieldUpdateOperationsInput | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFieldUpdateOperationsInput | $Enums.EstadoPago
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    pasarela?: EnumPasarelaPagoFieldUpdateOperationsInput | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFieldUpdateOperationsInput | $Enums.EstadoPago
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRolUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRolUsuarioFilter<$PrismaModel> | $Enums.RolUsuario
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AdminProfileNullableScalarRelationFilter = {
    is?: AdminProfileWhereInput | null
    isNot?: AdminProfileWhereInput | null
  }

  export type PedidoListRelationFilter = {
    every?: PedidoWhereInput
    some?: PedidoWhereInput
    none?: PedidoWhereInput
  }

  export type PedidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    mail?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    mail?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    mail?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRolUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRolUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.RolUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolUsuarioFilter<$PrismaModel>
    _max?: NestedEnumRolUsuarioFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminProfileCountOrderByAggregateInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminProfileAvgOrderByAggregateInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
  }

  export type AdminProfileMaxOrderByAggregateInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminProfileMinOrderByAggregateInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminProfileSumOrderByAggregateInput = {
    idAdmin?: SortOrder
    idUsuario?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumTipoSeguroFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoSeguro | EnumTipoSeguroFieldRefInput<$PrismaModel>
    in?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoSeguroFilter<$PrismaModel> | $Enums.TipoSeguro
  }

  export type PedidoItemListRelationFilter = {
    every?: PedidoItemWhereInput
    some?: PedidoItemWhereInput
    none?: PedidoItemWhereInput
  }

  export type CarritoItemListRelationFilter = {
    every?: CarritoItemWhereInput
    some?: CarritoItemWhereInput
    none?: CarritoItemWhereInput
  }

  export type PedidoItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CarritoItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    cobertura?: SortOrder
    tipo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    imagenUrl?: SortOrder
  }

  export type ProductoAvgOrderByAggregateInput = {
    id?: SortOrder
    precio?: SortOrder
  }

  export type ProductoMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    cobertura?: SortOrder
    tipo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    imagenUrl?: SortOrder
  }

  export type ProductoMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    cobertura?: SortOrder
    tipo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    imagenUrl?: SortOrder
  }

  export type ProductoSumOrderByAggregateInput = {
    id?: SortOrder
    precio?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTipoSeguroWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoSeguro | EnumTipoSeguroFieldRefInput<$PrismaModel>
    in?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoSeguroWithAggregatesFilter<$PrismaModel> | $Enums.TipoSeguro
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoSeguroFilter<$PrismaModel>
    _max?: NestedEnumTipoSeguroFilter<$PrismaModel>
  }

  export type EnumEstadoPolizaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPoliza | EnumEstadoPolizaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPolizaFilter<$PrismaModel> | $Enums.EstadoPoliza
  }

  export type PedidoScalarRelationFilter = {
    is?: PedidoWhereInput
    isNot?: PedidoWhereInput
  }

  export type PolizaCountOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    archivoUrl?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PolizaAvgOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
  }

  export type PolizaMaxOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    archivoUrl?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PolizaMinOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    archivoUrl?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PolizaSumOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
  }

  export type EnumEstadoPolizaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPoliza | EnumEstadoPolizaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPolizaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPoliza
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPolizaFilter<$PrismaModel>
    _max?: NestedEnumEstadoPolizaFilter<$PrismaModel>
  }

  export type ProductoScalarRelationFilter = {
    is?: ProductoWhereInput
    isNot?: ProductoWhereInput
  }

  export type PedidoItemIdPedidoIdProductoCompoundUniqueInput = {
    idPedido: number
    idProducto: number
  }

  export type PedidoItemCountOrderByAggregateInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    titulo?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
  }

  export type PedidoItemAvgOrderByAggregateInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
  }

  export type PedidoItemMaxOrderByAggregateInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    titulo?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
  }

  export type PedidoItemMinOrderByAggregateInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    titulo?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
  }

  export type PedidoItemSumOrderByAggregateInput = {
    idProducto?: SortOrder
    idPedido?: SortOrder
    precio?: SortOrder
    cantidad?: SortOrder
  }

  export type EnumMonedaFilter<$PrismaModel = never> = {
    equals?: $Enums.Moneda | EnumMonedaFieldRefInput<$PrismaModel>
    in?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    not?: NestedEnumMonedaFilter<$PrismaModel> | $Enums.Moneda
  }

  export type EnumEstadoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoFilter<$PrismaModel> | $Enums.EstadoPedido
  }

  export type PolizaNullableScalarRelationFilter = {
    is?: PolizaWhereInput | null
    isNot?: PolizaWhereInput | null
  }

  export type PagoNullableScalarRelationFilter = {
    is?: PagoWhereInput | null
    isNot?: PagoWhereInput | null
  }

  export type PedidoCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoAvgOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
  }

  export type PedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoSumOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    subtotal?: SortOrder
    total?: SortOrder
  }

  export type EnumMonedaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Moneda | EnumMonedaFieldRefInput<$PrismaModel>
    in?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    not?: NestedEnumMonedaWithAggregatesFilter<$PrismaModel> | $Enums.Moneda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMonedaFilter<$PrismaModel>
    _max?: NestedEnumMonedaFilter<$PrismaModel>
  }

  export type EnumEstadoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPedidoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPedidoFilter<$PrismaModel>
  }

  export type CarritoScalarRelationFilter = {
    is?: CarritoWhereInput
    isNot?: CarritoWhereInput
  }

  export type CarritoItemIdCarritoIdProductoCompoundUniqueInput = {
    idCarrito: number
    idProducto: number
  }

  export type CarritoItemCountOrderByAggregateInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
  }

  export type CarritoItemAvgOrderByAggregateInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
  }

  export type CarritoItemMaxOrderByAggregateInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
  }

  export type CarritoItemMinOrderByAggregateInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
  }

  export type CarritoItemSumOrderByAggregateInput = {
    idProducto?: SortOrder
    idCarrito?: SortOrder
    cantidad?: SortOrder
  }

  export type CarritoCountOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarritoAvgOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
  }

  export type CarritoMaxOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarritoMinOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarritoSumOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
  }

  export type EnumPasarelaPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.PasarelaPago | EnumPasarelaPagoFieldRefInput<$PrismaModel>
    in?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumPasarelaPagoFilter<$PrismaModel> | $Enums.PasarelaPago
  }

  export type EnumEstadoPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPago | EnumEstadoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPagoFilter<$PrismaModel> | $Enums.EstadoPago
  }

  export type PagoCountOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    pasarela?: SortOrder
    estado?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoAvgOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    monto?: SortOrder
  }

  export type PagoMaxOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    pasarela?: SortOrder
    estado?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoMinOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    pasarela?: SortOrder
    estado?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoSumOrderByAggregateInput = {
    id?: SortOrder
    idPedido?: SortOrder
    monto?: SortOrder
  }

  export type EnumPasarelaPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PasarelaPago | EnumPasarelaPagoFieldRefInput<$PrismaModel>
    in?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumPasarelaPagoWithAggregatesFilter<$PrismaModel> | $Enums.PasarelaPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPasarelaPagoFilter<$PrismaModel>
    _max?: NestedEnumPasarelaPagoFilter<$PrismaModel>
  }

  export type EnumEstadoPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPago | EnumEstadoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPagoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPagoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPagoFilter<$PrismaModel>
  }

  export type AdminProfileCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<AdminProfileCreateWithoutUsuarioInput, AdminProfileUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUsuarioInput
    connect?: AdminProfileWhereUniqueInput
  }

  export type PedidoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type AdminProfileUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<AdminProfileCreateWithoutUsuarioInput, AdminProfileUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUsuarioInput
    connect?: AdminProfileWhereUniqueInput
  }

  export type PedidoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRolUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.RolUsuario
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AdminProfileUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<AdminProfileCreateWithoutUsuarioInput, AdminProfileUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUsuarioInput
    upsert?: AdminProfileUpsertWithoutUsuarioInput
    disconnect?: AdminProfileWhereInput | boolean
    delete?: AdminProfileWhereInput | boolean
    connect?: AdminProfileWhereUniqueInput
    update?: XOR<XOR<AdminProfileUpdateToOneWithWhereWithoutUsuarioInput, AdminProfileUpdateWithoutUsuarioInput>, AdminProfileUncheckedUpdateWithoutUsuarioInput>
  }

  export type PedidoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutUsuarioInput | PedidoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutUsuarioInput | PedidoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutUsuarioInput | PedidoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AdminProfileUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<AdminProfileCreateWithoutUsuarioInput, AdminProfileUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUsuarioInput
    upsert?: AdminProfileUpsertWithoutUsuarioInput
    disconnect?: AdminProfileWhereInput | boolean
    delete?: AdminProfileWhereInput | boolean
    connect?: AdminProfileWhereUniqueInput
    update?: XOR<XOR<AdminProfileUpdateToOneWithWhereWithoutUsuarioInput, AdminProfileUpdateWithoutUsuarioInput>, AdminProfileUncheckedUpdateWithoutUsuarioInput>
  }

  export type PedidoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutUsuarioInput | PedidoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutUsuarioInput | PedidoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutUsuarioInput | PedidoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutAdminProfileInput = {
    create?: XOR<UsuarioCreateWithoutAdminProfileInput, UsuarioUncheckedCreateWithoutAdminProfileInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAdminProfileInput
    connect?: UsuarioWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UsuarioUpdateOneRequiredWithoutAdminProfileNestedInput = {
    create?: XOR<UsuarioCreateWithoutAdminProfileInput, UsuarioUncheckedCreateWithoutAdminProfileInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAdminProfileInput
    upsert?: UsuarioUpsertWithoutAdminProfileInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutAdminProfileInput, UsuarioUpdateWithoutAdminProfileInput>, UsuarioUncheckedUpdateWithoutAdminProfileInput>
  }

  export type PedidoItemCreateNestedManyWithoutProductoInput = {
    create?: XOR<PedidoItemCreateWithoutProductoInput, PedidoItemUncheckedCreateWithoutProductoInput> | PedidoItemCreateWithoutProductoInput[] | PedidoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProductoInput | PedidoItemCreateOrConnectWithoutProductoInput[]
    createMany?: PedidoItemCreateManyProductoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type CarritoItemCreateNestedManyWithoutProductoInput = {
    create?: XOR<CarritoItemCreateWithoutProductoInput, CarritoItemUncheckedCreateWithoutProductoInput> | CarritoItemCreateWithoutProductoInput[] | CarritoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutProductoInput | CarritoItemCreateOrConnectWithoutProductoInput[]
    createMany?: CarritoItemCreateManyProductoInputEnvelope
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
  }

  export type PedidoItemUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<PedidoItemCreateWithoutProductoInput, PedidoItemUncheckedCreateWithoutProductoInput> | PedidoItemCreateWithoutProductoInput[] | PedidoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProductoInput | PedidoItemCreateOrConnectWithoutProductoInput[]
    createMany?: PedidoItemCreateManyProductoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type CarritoItemUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<CarritoItemCreateWithoutProductoInput, CarritoItemUncheckedCreateWithoutProductoInput> | CarritoItemCreateWithoutProductoInput[] | CarritoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutProductoInput | CarritoItemCreateOrConnectWithoutProductoInput[]
    createMany?: CarritoItemCreateManyProductoInputEnvelope
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumTipoSeguroFieldUpdateOperationsInput = {
    set?: $Enums.TipoSeguro
  }

  export type PedidoItemUpdateManyWithoutProductoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutProductoInput, PedidoItemUncheckedCreateWithoutProductoInput> | PedidoItemCreateWithoutProductoInput[] | PedidoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProductoInput | PedidoItemCreateOrConnectWithoutProductoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutProductoInput | PedidoItemUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: PedidoItemCreateManyProductoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutProductoInput | PedidoItemUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutProductoInput | PedidoItemUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type CarritoItemUpdateManyWithoutProductoNestedInput = {
    create?: XOR<CarritoItemCreateWithoutProductoInput, CarritoItemUncheckedCreateWithoutProductoInput> | CarritoItemCreateWithoutProductoInput[] | CarritoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutProductoInput | CarritoItemCreateOrConnectWithoutProductoInput[]
    upsert?: CarritoItemUpsertWithWhereUniqueWithoutProductoInput | CarritoItemUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: CarritoItemCreateManyProductoInputEnvelope
    set?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    disconnect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    delete?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    update?: CarritoItemUpdateWithWhereUniqueWithoutProductoInput | CarritoItemUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: CarritoItemUpdateManyWithWhereWithoutProductoInput | CarritoItemUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: CarritoItemScalarWhereInput | CarritoItemScalarWhereInput[]
  }

  export type PedidoItemUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutProductoInput, PedidoItemUncheckedCreateWithoutProductoInput> | PedidoItemCreateWithoutProductoInput[] | PedidoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutProductoInput | PedidoItemCreateOrConnectWithoutProductoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutProductoInput | PedidoItemUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: PedidoItemCreateManyProductoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutProductoInput | PedidoItemUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutProductoInput | PedidoItemUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type CarritoItemUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<CarritoItemCreateWithoutProductoInput, CarritoItemUncheckedCreateWithoutProductoInput> | CarritoItemCreateWithoutProductoInput[] | CarritoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutProductoInput | CarritoItemCreateOrConnectWithoutProductoInput[]
    upsert?: CarritoItemUpsertWithWhereUniqueWithoutProductoInput | CarritoItemUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: CarritoItemCreateManyProductoInputEnvelope
    set?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    disconnect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    delete?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    update?: CarritoItemUpdateWithWhereUniqueWithoutProductoInput | CarritoItemUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: CarritoItemUpdateManyWithWhereWithoutProductoInput | CarritoItemUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: CarritoItemScalarWhereInput | CarritoItemScalarWhereInput[]
  }

  export type PedidoCreateNestedOneWithoutPolizaInput = {
    create?: XOR<PedidoCreateWithoutPolizaInput, PedidoUncheckedCreateWithoutPolizaInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutPolizaInput
    connect?: PedidoWhereUniqueInput
  }

  export type EnumEstadoPolizaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPoliza
  }

  export type PedidoUpdateOneRequiredWithoutPolizaNestedInput = {
    create?: XOR<PedidoCreateWithoutPolizaInput, PedidoUncheckedCreateWithoutPolizaInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutPolizaInput
    upsert?: PedidoUpsertWithoutPolizaInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutPolizaInput, PedidoUpdateWithoutPolizaInput>, PedidoUncheckedUpdateWithoutPolizaInput>
  }

  export type ProductoCreateNestedOneWithoutItemsPedidoInput = {
    create?: XOR<ProductoCreateWithoutItemsPedidoInput, ProductoUncheckedCreateWithoutItemsPedidoInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsPedidoInput
    connect?: ProductoWhereUniqueInput
  }

  export type PedidoCreateNestedOneWithoutItemsInput = {
    create?: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutItemsInput
    connect?: PedidoWhereUniqueInput
  }

  export type ProductoUpdateOneRequiredWithoutItemsPedidoNestedInput = {
    create?: XOR<ProductoCreateWithoutItemsPedidoInput, ProductoUncheckedCreateWithoutItemsPedidoInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsPedidoInput
    upsert?: ProductoUpsertWithoutItemsPedidoInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutItemsPedidoInput, ProductoUpdateWithoutItemsPedidoInput>, ProductoUncheckedUpdateWithoutItemsPedidoInput>
  }

  export type PedidoUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutItemsInput
    upsert?: PedidoUpsertWithoutItemsInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutItemsInput, PedidoUpdateWithoutItemsInput>, PedidoUncheckedUpdateWithoutItemsInput>
  }

  export type UsuarioCreateNestedOneWithoutPedidosInput = {
    create?: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPedidosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type PedidoItemCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type PolizaCreateNestedOneWithoutPedidoInput = {
    create?: XOR<PolizaCreateWithoutPedidoInput, PolizaUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PolizaCreateOrConnectWithoutPedidoInput
    connect?: PolizaWhereUniqueInput
  }

  export type PagoCreateNestedOneWithoutPedidoInput = {
    create?: XOR<PagoCreateWithoutPedidoInput, PagoUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PagoCreateOrConnectWithoutPedidoInput
    connect?: PagoWhereUniqueInput
  }

  export type PedidoItemUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type PolizaUncheckedCreateNestedOneWithoutPedidoInput = {
    create?: XOR<PolizaCreateWithoutPedidoInput, PolizaUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PolizaCreateOrConnectWithoutPedidoInput
    connect?: PolizaWhereUniqueInput
  }

  export type PagoUncheckedCreateNestedOneWithoutPedidoInput = {
    create?: XOR<PagoCreateWithoutPedidoInput, PagoUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PagoCreateOrConnectWithoutPedidoInput
    connect?: PagoWhereUniqueInput
  }

  export type EnumMonedaFieldUpdateOperationsInput = {
    set?: $Enums.Moneda
  }

  export type EnumEstadoPedidoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPedido
  }

  export type UsuarioUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPedidosInput
    upsert?: UsuarioUpsertWithoutPedidosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutPedidosInput, UsuarioUpdateWithoutPedidosInput>, UsuarioUncheckedUpdateWithoutPedidosInput>
  }

  export type PedidoItemUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutPedidoInput | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutPedidoInput | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutPedidoInput | PedidoItemUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type PolizaUpdateOneWithoutPedidoNestedInput = {
    create?: XOR<PolizaCreateWithoutPedidoInput, PolizaUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PolizaCreateOrConnectWithoutPedidoInput
    upsert?: PolizaUpsertWithoutPedidoInput
    disconnect?: PolizaWhereInput | boolean
    delete?: PolizaWhereInput | boolean
    connect?: PolizaWhereUniqueInput
    update?: XOR<XOR<PolizaUpdateToOneWithWhereWithoutPedidoInput, PolizaUpdateWithoutPedidoInput>, PolizaUncheckedUpdateWithoutPedidoInput>
  }

  export type PagoUpdateOneWithoutPedidoNestedInput = {
    create?: XOR<PagoCreateWithoutPedidoInput, PagoUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PagoCreateOrConnectWithoutPedidoInput
    upsert?: PagoUpsertWithoutPedidoInput
    disconnect?: PagoWhereInput | boolean
    delete?: PagoWhereInput | boolean
    connect?: PagoWhereUniqueInput
    update?: XOR<XOR<PagoUpdateToOneWithWhereWithoutPedidoInput, PagoUpdateWithoutPedidoInput>, PagoUncheckedUpdateWithoutPedidoInput>
  }

  export type PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutPedidoInput | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutPedidoInput | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutPedidoInput | PedidoItemUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type PolizaUncheckedUpdateOneWithoutPedidoNestedInput = {
    create?: XOR<PolizaCreateWithoutPedidoInput, PolizaUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PolizaCreateOrConnectWithoutPedidoInput
    upsert?: PolizaUpsertWithoutPedidoInput
    disconnect?: PolizaWhereInput | boolean
    delete?: PolizaWhereInput | boolean
    connect?: PolizaWhereUniqueInput
    update?: XOR<XOR<PolizaUpdateToOneWithWhereWithoutPedidoInput, PolizaUpdateWithoutPedidoInput>, PolizaUncheckedUpdateWithoutPedidoInput>
  }

  export type PagoUncheckedUpdateOneWithoutPedidoNestedInput = {
    create?: XOR<PagoCreateWithoutPedidoInput, PagoUncheckedCreateWithoutPedidoInput>
    connectOrCreate?: PagoCreateOrConnectWithoutPedidoInput
    upsert?: PagoUpsertWithoutPedidoInput
    disconnect?: PagoWhereInput | boolean
    delete?: PagoWhereInput | boolean
    connect?: PagoWhereUniqueInput
    update?: XOR<XOR<PagoUpdateToOneWithWhereWithoutPedidoInput, PagoUpdateWithoutPedidoInput>, PagoUncheckedUpdateWithoutPedidoInput>
  }

  export type ProductoCreateNestedOneWithoutItemsCarritoInput = {
    create?: XOR<ProductoCreateWithoutItemsCarritoInput, ProductoUncheckedCreateWithoutItemsCarritoInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsCarritoInput
    connect?: ProductoWhereUniqueInput
  }

  export type CarritoCreateNestedOneWithoutItemsInput = {
    create?: XOR<CarritoCreateWithoutItemsInput, CarritoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CarritoCreateOrConnectWithoutItemsInput
    connect?: CarritoWhereUniqueInput
  }

  export type ProductoUpdateOneRequiredWithoutItemsCarritoNestedInput = {
    create?: XOR<ProductoCreateWithoutItemsCarritoInput, ProductoUncheckedCreateWithoutItemsCarritoInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsCarritoInput
    upsert?: ProductoUpsertWithoutItemsCarritoInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutItemsCarritoInput, ProductoUpdateWithoutItemsCarritoInput>, ProductoUncheckedUpdateWithoutItemsCarritoInput>
  }

  export type CarritoUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CarritoCreateWithoutItemsInput, CarritoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CarritoCreateOrConnectWithoutItemsInput
    upsert?: CarritoUpsertWithoutItemsInput
    connect?: CarritoWhereUniqueInput
    update?: XOR<XOR<CarritoUpdateToOneWithWhereWithoutItemsInput, CarritoUpdateWithoutItemsInput>, CarritoUncheckedUpdateWithoutItemsInput>
  }

  export type CarritoItemCreateNestedManyWithoutCarritoInput = {
    create?: XOR<CarritoItemCreateWithoutCarritoInput, CarritoItemUncheckedCreateWithoutCarritoInput> | CarritoItemCreateWithoutCarritoInput[] | CarritoItemUncheckedCreateWithoutCarritoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutCarritoInput | CarritoItemCreateOrConnectWithoutCarritoInput[]
    createMany?: CarritoItemCreateManyCarritoInputEnvelope
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
  }

  export type CarritoItemUncheckedCreateNestedManyWithoutCarritoInput = {
    create?: XOR<CarritoItemCreateWithoutCarritoInput, CarritoItemUncheckedCreateWithoutCarritoInput> | CarritoItemCreateWithoutCarritoInput[] | CarritoItemUncheckedCreateWithoutCarritoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutCarritoInput | CarritoItemCreateOrConnectWithoutCarritoInput[]
    createMany?: CarritoItemCreateManyCarritoInputEnvelope
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
  }

  export type CarritoItemUpdateManyWithoutCarritoNestedInput = {
    create?: XOR<CarritoItemCreateWithoutCarritoInput, CarritoItemUncheckedCreateWithoutCarritoInput> | CarritoItemCreateWithoutCarritoInput[] | CarritoItemUncheckedCreateWithoutCarritoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutCarritoInput | CarritoItemCreateOrConnectWithoutCarritoInput[]
    upsert?: CarritoItemUpsertWithWhereUniqueWithoutCarritoInput | CarritoItemUpsertWithWhereUniqueWithoutCarritoInput[]
    createMany?: CarritoItemCreateManyCarritoInputEnvelope
    set?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    disconnect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    delete?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    update?: CarritoItemUpdateWithWhereUniqueWithoutCarritoInput | CarritoItemUpdateWithWhereUniqueWithoutCarritoInput[]
    updateMany?: CarritoItemUpdateManyWithWhereWithoutCarritoInput | CarritoItemUpdateManyWithWhereWithoutCarritoInput[]
    deleteMany?: CarritoItemScalarWhereInput | CarritoItemScalarWhereInput[]
  }

  export type CarritoItemUncheckedUpdateManyWithoutCarritoNestedInput = {
    create?: XOR<CarritoItemCreateWithoutCarritoInput, CarritoItemUncheckedCreateWithoutCarritoInput> | CarritoItemCreateWithoutCarritoInput[] | CarritoItemUncheckedCreateWithoutCarritoInput[]
    connectOrCreate?: CarritoItemCreateOrConnectWithoutCarritoInput | CarritoItemCreateOrConnectWithoutCarritoInput[]
    upsert?: CarritoItemUpsertWithWhereUniqueWithoutCarritoInput | CarritoItemUpsertWithWhereUniqueWithoutCarritoInput[]
    createMany?: CarritoItemCreateManyCarritoInputEnvelope
    set?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    disconnect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    delete?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    connect?: CarritoItemWhereUniqueInput | CarritoItemWhereUniqueInput[]
    update?: CarritoItemUpdateWithWhereUniqueWithoutCarritoInput | CarritoItemUpdateWithWhereUniqueWithoutCarritoInput[]
    updateMany?: CarritoItemUpdateManyWithWhereWithoutCarritoInput | CarritoItemUpdateManyWithWhereWithoutCarritoInput[]
    deleteMany?: CarritoItemScalarWhereInput | CarritoItemScalarWhereInput[]
  }

  export type PedidoCreateNestedOneWithoutPagoInput = {
    create?: XOR<PedidoCreateWithoutPagoInput, PedidoUncheckedCreateWithoutPagoInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutPagoInput
    connect?: PedidoWhereUniqueInput
  }

  export type EnumPasarelaPagoFieldUpdateOperationsInput = {
    set?: $Enums.PasarelaPago
  }

  export type EnumEstadoPagoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPago
  }

  export type PedidoUpdateOneRequiredWithoutPagoNestedInput = {
    create?: XOR<PedidoCreateWithoutPagoInput, PedidoUncheckedCreateWithoutPagoInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutPagoInput
    upsert?: PedidoUpsertWithoutPagoInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutPagoInput, PedidoUpdateWithoutPagoInput>, PedidoUncheckedUpdateWithoutPagoInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRolUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRolUsuarioFilter<$PrismaModel> | $Enums.RolUsuario
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRolUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRolUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.RolUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolUsuarioFilter<$PrismaModel>
    _max?: NestedEnumRolUsuarioFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumTipoSeguroFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoSeguro | EnumTipoSeguroFieldRefInput<$PrismaModel>
    in?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoSeguroFilter<$PrismaModel> | $Enums.TipoSeguro
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTipoSeguroWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoSeguro | EnumTipoSeguroFieldRefInput<$PrismaModel>
    in?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoSeguro[] | ListEnumTipoSeguroFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoSeguroWithAggregatesFilter<$PrismaModel> | $Enums.TipoSeguro
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoSeguroFilter<$PrismaModel>
    _max?: NestedEnumTipoSeguroFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPolizaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPoliza | EnumEstadoPolizaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPolizaFilter<$PrismaModel> | $Enums.EstadoPoliza
  }

  export type NestedEnumEstadoPolizaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPoliza | EnumEstadoPolizaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPoliza[] | ListEnumEstadoPolizaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPolizaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPoliza
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPolizaFilter<$PrismaModel>
    _max?: NestedEnumEstadoPolizaFilter<$PrismaModel>
  }

  export type NestedEnumMonedaFilter<$PrismaModel = never> = {
    equals?: $Enums.Moneda | EnumMonedaFieldRefInput<$PrismaModel>
    in?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    not?: NestedEnumMonedaFilter<$PrismaModel> | $Enums.Moneda
  }

  export type NestedEnumEstadoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoFilter<$PrismaModel> | $Enums.EstadoPedido
  }

  export type NestedEnumMonedaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Moneda | EnumMonedaFieldRefInput<$PrismaModel>
    in?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Moneda[] | ListEnumMonedaFieldRefInput<$PrismaModel>
    not?: NestedEnumMonedaWithAggregatesFilter<$PrismaModel> | $Enums.Moneda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMonedaFilter<$PrismaModel>
    _max?: NestedEnumMonedaFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPedidoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPedidoFilter<$PrismaModel>
  }

  export type NestedEnumPasarelaPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.PasarelaPago | EnumPasarelaPagoFieldRefInput<$PrismaModel>
    in?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumPasarelaPagoFilter<$PrismaModel> | $Enums.PasarelaPago
  }

  export type NestedEnumEstadoPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPago | EnumEstadoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPagoFilter<$PrismaModel> | $Enums.EstadoPago
  }

  export type NestedEnumPasarelaPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PasarelaPago | EnumPasarelaPagoFieldRefInput<$PrismaModel>
    in?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PasarelaPago[] | ListEnumPasarelaPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumPasarelaPagoWithAggregatesFilter<$PrismaModel> | $Enums.PasarelaPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPasarelaPagoFilter<$PrismaModel>
    _max?: NestedEnumPasarelaPagoFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPago | EnumEstadoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPago[] | ListEnumEstadoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPagoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPagoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPagoFilter<$PrismaModel>
  }

  export type AdminProfileCreateWithoutUsuarioInput = {
    nombre: string
    email: string
    telefono?: string | null
    activo: boolean
    createdAt?: Date | string
  }

  export type AdminProfileUncheckedCreateWithoutUsuarioInput = {
    idAdmin?: number
    nombre: string
    email: string
    telefono?: string | null
    activo: boolean
    createdAt?: Date | string
  }

  export type AdminProfileCreateOrConnectWithoutUsuarioInput = {
    where: AdminProfileWhereUniqueInput
    create: XOR<AdminProfileCreateWithoutUsuarioInput, AdminProfileUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidoCreateWithoutUsuarioInput = {
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemCreateNestedManyWithoutPedidoInput
    poliza?: PolizaCreateNestedOneWithoutPedidoInput
    pago?: PagoCreateNestedOneWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutUsuarioInput = {
    id?: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    poliza?: PolizaUncheckedCreateNestedOneWithoutPedidoInput
    pago?: PagoUncheckedCreateNestedOneWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidoCreateManyUsuarioInputEnvelope = {
    data: PedidoCreateManyUsuarioInput | PedidoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type AdminProfileUpsertWithoutUsuarioInput = {
    update: XOR<AdminProfileUpdateWithoutUsuarioInput, AdminProfileUncheckedUpdateWithoutUsuarioInput>
    create: XOR<AdminProfileCreateWithoutUsuarioInput, AdminProfileUncheckedCreateWithoutUsuarioInput>
    where?: AdminProfileWhereInput
  }

  export type AdminProfileUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: AdminProfileWhereInput
    data: XOR<AdminProfileUpdateWithoutUsuarioInput, AdminProfileUncheckedUpdateWithoutUsuarioInput>
  }

  export type AdminProfileUpdateWithoutUsuarioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUncheckedUpdateWithoutUsuarioInput = {
    idAdmin?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutUsuarioInput, PedidoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutUsuarioInput, PedidoUncheckedUpdateWithoutUsuarioInput>
  }

  export type PedidoUpdateManyWithWhereWithoutUsuarioInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type PedidoScalarWhereInput = {
    AND?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    OR?: PedidoScalarWhereInput[]
    NOT?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    id?: IntFilter<"Pedido"> | number
    idUsuario?: IntFilter<"Pedido"> | number
    subtotal?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFilter<"Pedido"> | $Enums.Moneda
    estado?: EnumEstadoPedidoFilter<"Pedido"> | $Enums.EstadoPedido
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
  }

  export type UsuarioCreateWithoutAdminProfileInput = {
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutAdminProfileInput = {
    id?: number
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutAdminProfileInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutAdminProfileInput, UsuarioUncheckedCreateWithoutAdminProfileInput>
  }

  export type UsuarioUpsertWithoutAdminProfileInput = {
    update: XOR<UsuarioUpdateWithoutAdminProfileInput, UsuarioUncheckedUpdateWithoutAdminProfileInput>
    create: XOR<UsuarioCreateWithoutAdminProfileInput, UsuarioUncheckedCreateWithoutAdminProfileInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutAdminProfileInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutAdminProfileInput, UsuarioUncheckedUpdateWithoutAdminProfileInput>
  }

  export type UsuarioUpdateWithoutAdminProfileInput = {
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutAdminProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type PedidoItemCreateWithoutProductoInput = {
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
    pedido: PedidoCreateNestedOneWithoutItemsInput
  }

  export type PedidoItemUncheckedCreateWithoutProductoInput = {
    idPedido: number
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
  }

  export type PedidoItemCreateOrConnectWithoutProductoInput = {
    where: PedidoItemWhereUniqueInput
    create: XOR<PedidoItemCreateWithoutProductoInput, PedidoItemUncheckedCreateWithoutProductoInput>
  }

  export type PedidoItemCreateManyProductoInputEnvelope = {
    data: PedidoItemCreateManyProductoInput | PedidoItemCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type CarritoItemCreateWithoutProductoInput = {
    cantidad?: number
    carrito: CarritoCreateNestedOneWithoutItemsInput
  }

  export type CarritoItemUncheckedCreateWithoutProductoInput = {
    idCarrito: number
    cantidad?: number
  }

  export type CarritoItemCreateOrConnectWithoutProductoInput = {
    where: CarritoItemWhereUniqueInput
    create: XOR<CarritoItemCreateWithoutProductoInput, CarritoItemUncheckedCreateWithoutProductoInput>
  }

  export type CarritoItemCreateManyProductoInputEnvelope = {
    data: CarritoItemCreateManyProductoInput | CarritoItemCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type PedidoItemUpsertWithWhereUniqueWithoutProductoInput = {
    where: PedidoItemWhereUniqueInput
    update: XOR<PedidoItemUpdateWithoutProductoInput, PedidoItemUncheckedUpdateWithoutProductoInput>
    create: XOR<PedidoItemCreateWithoutProductoInput, PedidoItemUncheckedCreateWithoutProductoInput>
  }

  export type PedidoItemUpdateWithWhereUniqueWithoutProductoInput = {
    where: PedidoItemWhereUniqueInput
    data: XOR<PedidoItemUpdateWithoutProductoInput, PedidoItemUncheckedUpdateWithoutProductoInput>
  }

  export type PedidoItemUpdateManyWithWhereWithoutProductoInput = {
    where: PedidoItemScalarWhereInput
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutProductoInput>
  }

  export type PedidoItemScalarWhereInput = {
    AND?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
    OR?: PedidoItemScalarWhereInput[]
    NOT?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
    idProducto?: IntFilter<"PedidoItem"> | number
    idPedido?: IntFilter<"PedidoItem"> | number
    titulo?: StringFilter<"PedidoItem"> | string
    precio?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    cantidad?: IntFilter<"PedidoItem"> | number
  }

  export type CarritoItemUpsertWithWhereUniqueWithoutProductoInput = {
    where: CarritoItemWhereUniqueInput
    update: XOR<CarritoItemUpdateWithoutProductoInput, CarritoItemUncheckedUpdateWithoutProductoInput>
    create: XOR<CarritoItemCreateWithoutProductoInput, CarritoItemUncheckedCreateWithoutProductoInput>
  }

  export type CarritoItemUpdateWithWhereUniqueWithoutProductoInput = {
    where: CarritoItemWhereUniqueInput
    data: XOR<CarritoItemUpdateWithoutProductoInput, CarritoItemUncheckedUpdateWithoutProductoInput>
  }

  export type CarritoItemUpdateManyWithWhereWithoutProductoInput = {
    where: CarritoItemScalarWhereInput
    data: XOR<CarritoItemUpdateManyMutationInput, CarritoItemUncheckedUpdateManyWithoutProductoInput>
  }

  export type CarritoItemScalarWhereInput = {
    AND?: CarritoItemScalarWhereInput | CarritoItemScalarWhereInput[]
    OR?: CarritoItemScalarWhereInput[]
    NOT?: CarritoItemScalarWhereInput | CarritoItemScalarWhereInput[]
    idProducto?: IntFilter<"CarritoItem"> | number
    idCarrito?: IntFilter<"CarritoItem"> | number
    cantidad?: IntFilter<"CarritoItem"> | number
  }

  export type PedidoCreateWithoutPolizaInput = {
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPedidosInput
    items?: PedidoItemCreateNestedManyWithoutPedidoInput
    pago?: PagoCreateNestedOneWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutPolizaInput = {
    id?: number
    idUsuario: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    pago?: PagoUncheckedCreateNestedOneWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutPolizaInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutPolizaInput, PedidoUncheckedCreateWithoutPolizaInput>
  }

  export type PedidoUpsertWithoutPolizaInput = {
    update: XOR<PedidoUpdateWithoutPolizaInput, PedidoUncheckedUpdateWithoutPolizaInput>
    create: XOR<PedidoCreateWithoutPolizaInput, PedidoUncheckedCreateWithoutPolizaInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutPolizaInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutPolizaInput, PedidoUncheckedUpdateWithoutPolizaInput>
  }

  export type PedidoUpdateWithoutPolizaInput = {
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput
    items?: PedidoItemUpdateManyWithoutPedidoNestedInput
    pago?: PagoUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutPolizaInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    pago?: PagoUncheckedUpdateOneWithoutPedidoNestedInput
  }

  export type ProductoCreateWithoutItemsPedidoInput = {
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
    itemsCarrito?: CarritoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutItemsPedidoInput = {
    id?: number
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
    itemsCarrito?: CarritoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutItemsPedidoInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutItemsPedidoInput, ProductoUncheckedCreateWithoutItemsPedidoInput>
  }

  export type PedidoCreateWithoutItemsInput = {
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPedidosInput
    poliza?: PolizaCreateNestedOneWithoutPedidoInput
    pago?: PagoCreateNestedOneWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutItemsInput = {
    id?: number
    idUsuario: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    poliza?: PolizaUncheckedCreateNestedOneWithoutPedidoInput
    pago?: PagoUncheckedCreateNestedOneWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutItemsInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
  }

  export type ProductoUpsertWithoutItemsPedidoInput = {
    update: XOR<ProductoUpdateWithoutItemsPedidoInput, ProductoUncheckedUpdateWithoutItemsPedidoInput>
    create: XOR<ProductoCreateWithoutItemsPedidoInput, ProductoUncheckedCreateWithoutItemsPedidoInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutItemsPedidoInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutItemsPedidoInput, ProductoUncheckedUpdateWithoutItemsPedidoInput>
  }

  export type ProductoUpdateWithoutItemsPedidoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    itemsCarrito?: CarritoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutItemsPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    itemsCarrito?: CarritoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type PedidoUpsertWithoutItemsInput = {
    update: XOR<PedidoUpdateWithoutItemsInput, PedidoUncheckedUpdateWithoutItemsInput>
    create: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutItemsInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutItemsInput, PedidoUncheckedUpdateWithoutItemsInput>
  }

  export type PedidoUpdateWithoutItemsInput = {
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput
    poliza?: PolizaUpdateOneWithoutPedidoNestedInput
    pago?: PagoUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poliza?: PolizaUncheckedUpdateOneWithoutPedidoNestedInput
    pago?: PagoUncheckedUpdateOneWithoutPedidoNestedInput
  }

  export type UsuarioCreateWithoutPedidosInput = {
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
    adminProfile?: AdminProfileCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutPedidosInput = {
    id?: number
    username: string
    mail: string
    passwordHash: string
    rol?: $Enums.RolUsuario
    createdAt?: Date | string
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutPedidosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
  }

  export type PedidoItemCreateWithoutPedidoInput = {
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
    producto: ProductoCreateNestedOneWithoutItemsPedidoInput
  }

  export type PedidoItemUncheckedCreateWithoutPedidoInput = {
    idProducto: number
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
  }

  export type PedidoItemCreateOrConnectWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoItemCreateManyPedidoInputEnvelope = {
    data: PedidoItemCreateManyPedidoInput | PedidoItemCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type PolizaCreateWithoutPedidoInput = {
    archivoUrl: string
    estado?: $Enums.EstadoPoliza
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PolizaUncheckedCreateWithoutPedidoInput = {
    id?: number
    archivoUrl: string
    estado?: $Enums.EstadoPoliza
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PolizaCreateOrConnectWithoutPedidoInput = {
    where: PolizaWhereUniqueInput
    create: XOR<PolizaCreateWithoutPedidoInput, PolizaUncheckedCreateWithoutPedidoInput>
  }

  export type PagoCreateWithoutPedidoInput = {
    pasarela: $Enums.PasarelaPago
    estado: $Enums.EstadoPago
    monto: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    createdAt?: Date | string
  }

  export type PagoUncheckedCreateWithoutPedidoInput = {
    id?: number
    pasarela: $Enums.PasarelaPago
    estado: $Enums.EstadoPago
    monto: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    createdAt?: Date | string
  }

  export type PagoCreateOrConnectWithoutPedidoInput = {
    where: PagoWhereUniqueInput
    create: XOR<PagoCreateWithoutPedidoInput, PagoUncheckedCreateWithoutPedidoInput>
  }

  export type UsuarioUpsertWithoutPedidosInput = {
    update: XOR<UsuarioUpdateWithoutPedidosInput, UsuarioUncheckedUpdateWithoutPedidosInput>
    create: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutPedidosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutPedidosInput, UsuarioUncheckedUpdateWithoutPedidosInput>
  }

  export type UsuarioUpdateWithoutPedidosInput = {
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminProfile?: AdminProfileUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type PedidoItemUpsertWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    update: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoItemUpdateWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    data: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>
  }

  export type PedidoItemUpdateManyWithWhereWithoutPedidoInput = {
    where: PedidoItemScalarWhereInput
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutPedidoInput>
  }

  export type PolizaUpsertWithoutPedidoInput = {
    update: XOR<PolizaUpdateWithoutPedidoInput, PolizaUncheckedUpdateWithoutPedidoInput>
    create: XOR<PolizaCreateWithoutPedidoInput, PolizaUncheckedCreateWithoutPedidoInput>
    where?: PolizaWhereInput
  }

  export type PolizaUpdateToOneWithWhereWithoutPedidoInput = {
    where?: PolizaWhereInput
    data: XOR<PolizaUpdateWithoutPedidoInput, PolizaUncheckedUpdateWithoutPedidoInput>
  }

  export type PolizaUpdateWithoutPedidoInput = {
    archivoUrl?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPolizaFieldUpdateOperationsInput | $Enums.EstadoPoliza
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolizaUncheckedUpdateWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    archivoUrl?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPolizaFieldUpdateOperationsInput | $Enums.EstadoPoliza
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUpsertWithoutPedidoInput = {
    update: XOR<PagoUpdateWithoutPedidoInput, PagoUncheckedUpdateWithoutPedidoInput>
    create: XOR<PagoCreateWithoutPedidoInput, PagoUncheckedCreateWithoutPedidoInput>
    where?: PagoWhereInput
  }

  export type PagoUpdateToOneWithWhereWithoutPedidoInput = {
    where?: PagoWhereInput
    data: XOR<PagoUpdateWithoutPedidoInput, PagoUncheckedUpdateWithoutPedidoInput>
  }

  export type PagoUpdateWithoutPedidoInput = {
    pasarela?: EnumPasarelaPagoFieldUpdateOperationsInput | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFieldUpdateOperationsInput | $Enums.EstadoPago
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    pasarela?: EnumPasarelaPagoFieldUpdateOperationsInput | $Enums.PasarelaPago
    estado?: EnumEstadoPagoFieldUpdateOperationsInput | $Enums.EstadoPago
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateWithoutItemsCarritoInput = {
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
    itemsPedido?: PedidoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutItemsCarritoInput = {
    id?: number
    titulo: string
    descripcion: string
    precio: Decimal | DecimalJsLike | number | string
    cobertura: string
    tipo: $Enums.TipoSeguro
    isActive: boolean
    createdAt?: Date | string
    imagenUrl?: string | null
    itemsPedido?: PedidoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutItemsCarritoInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutItemsCarritoInput, ProductoUncheckedCreateWithoutItemsCarritoInput>
  }

  export type CarritoCreateWithoutItemsInput = {
    total?: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    updatedAt?: Date | string
  }

  export type CarritoUncheckedCreateWithoutItemsInput = {
    id?: number
    total?: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    updatedAt?: Date | string
  }

  export type CarritoCreateOrConnectWithoutItemsInput = {
    where: CarritoWhereUniqueInput
    create: XOR<CarritoCreateWithoutItemsInput, CarritoUncheckedCreateWithoutItemsInput>
  }

  export type ProductoUpsertWithoutItemsCarritoInput = {
    update: XOR<ProductoUpdateWithoutItemsCarritoInput, ProductoUncheckedUpdateWithoutItemsCarritoInput>
    create: XOR<ProductoCreateWithoutItemsCarritoInput, ProductoUncheckedCreateWithoutItemsCarritoInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutItemsCarritoInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutItemsCarritoInput, ProductoUncheckedUpdateWithoutItemsCarritoInput>
  }

  export type ProductoUpdateWithoutItemsCarritoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    itemsPedido?: PedidoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutItemsCarritoInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cobertura?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoSeguroFieldUpdateOperationsInput | $Enums.TipoSeguro
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    itemsPedido?: PedidoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type CarritoUpsertWithoutItemsInput = {
    update: XOR<CarritoUpdateWithoutItemsInput, CarritoUncheckedUpdateWithoutItemsInput>
    create: XOR<CarritoCreateWithoutItemsInput, CarritoUncheckedCreateWithoutItemsInput>
    where?: CarritoWhereInput
  }

  export type CarritoUpdateToOneWithWhereWithoutItemsInput = {
    where?: CarritoWhereInput
    data: XOR<CarritoUpdateWithoutItemsInput, CarritoUncheckedUpdateWithoutItemsInput>
  }

  export type CarritoUpdateWithoutItemsInput = {
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarritoUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarritoItemCreateWithoutCarritoInput = {
    cantidad?: number
    producto: ProductoCreateNestedOneWithoutItemsCarritoInput
  }

  export type CarritoItemUncheckedCreateWithoutCarritoInput = {
    idProducto: number
    cantidad?: number
  }

  export type CarritoItemCreateOrConnectWithoutCarritoInput = {
    where: CarritoItemWhereUniqueInput
    create: XOR<CarritoItemCreateWithoutCarritoInput, CarritoItemUncheckedCreateWithoutCarritoInput>
  }

  export type CarritoItemCreateManyCarritoInputEnvelope = {
    data: CarritoItemCreateManyCarritoInput | CarritoItemCreateManyCarritoInput[]
    skipDuplicates?: boolean
  }

  export type CarritoItemUpsertWithWhereUniqueWithoutCarritoInput = {
    where: CarritoItemWhereUniqueInput
    update: XOR<CarritoItemUpdateWithoutCarritoInput, CarritoItemUncheckedUpdateWithoutCarritoInput>
    create: XOR<CarritoItemCreateWithoutCarritoInput, CarritoItemUncheckedCreateWithoutCarritoInput>
  }

  export type CarritoItemUpdateWithWhereUniqueWithoutCarritoInput = {
    where: CarritoItemWhereUniqueInput
    data: XOR<CarritoItemUpdateWithoutCarritoInput, CarritoItemUncheckedUpdateWithoutCarritoInput>
  }

  export type CarritoItemUpdateManyWithWhereWithoutCarritoInput = {
    where: CarritoItemScalarWhereInput
    data: XOR<CarritoItemUpdateManyMutationInput, CarritoItemUncheckedUpdateManyWithoutCarritoInput>
  }

  export type PedidoCreateWithoutPagoInput = {
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPedidosInput
    items?: PedidoItemCreateNestedManyWithoutPedidoInput
    poliza?: PolizaCreateNestedOneWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutPagoInput = {
    id?: number
    idUsuario: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
    poliza?: PolizaUncheckedCreateNestedOneWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutPagoInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutPagoInput, PedidoUncheckedCreateWithoutPagoInput>
  }

  export type PedidoUpsertWithoutPagoInput = {
    update: XOR<PedidoUpdateWithoutPagoInput, PedidoUncheckedUpdateWithoutPagoInput>
    create: XOR<PedidoCreateWithoutPagoInput, PedidoUncheckedCreateWithoutPagoInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutPagoInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutPagoInput, PedidoUncheckedUpdateWithoutPagoInput>
  }

  export type PedidoUpdateWithoutPagoInput = {
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput
    items?: PedidoItemUpdateManyWithoutPedidoNestedInput
    poliza?: PolizaUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutPagoInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    poliza?: PolizaUncheckedUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoCreateManyUsuarioInput = {
    id?: number
    subtotal: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    moneda?: $Enums.Moneda
    estado?: $Enums.EstadoPedido
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoUpdateWithoutUsuarioInput = {
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUpdateManyWithoutPedidoNestedInput
    poliza?: PolizaUpdateOneWithoutPedidoNestedInput
    pago?: PagoUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
    poliza?: PolizaUncheckedUpdateOneWithoutPedidoNestedInput
    pago?: PagoUncheckedUpdateOneWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    moneda?: EnumMonedaFieldUpdateOperationsInput | $Enums.Moneda
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoItemCreateManyProductoInput = {
    idPedido: number
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
  }

  export type CarritoItemCreateManyProductoInput = {
    idCarrito: number
    cantidad?: number
  }

  export type PedidoItemUpdateWithoutProductoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
    pedido?: PedidoUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PedidoItemUncheckedUpdateWithoutProductoInput = {
    idPedido?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoItemUncheckedUpdateManyWithoutProductoInput = {
    idPedido?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoItemUpdateWithoutProductoInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    carrito?: CarritoUpdateOneRequiredWithoutItemsNestedInput
  }

  export type CarritoItemUncheckedUpdateWithoutProductoInput = {
    idCarrito?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoItemUncheckedUpdateManyWithoutProductoInput = {
    idCarrito?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoItemCreateManyPedidoInput = {
    idProducto: number
    titulo: string
    precio: Decimal | DecimalJsLike | number | string
    cantidad: number
  }

  export type PedidoItemUpdateWithoutPedidoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
    producto?: ProductoUpdateOneRequiredWithoutItemsPedidoNestedInput
  }

  export type PedidoItemUncheckedUpdateWithoutPedidoInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoItemUncheckedUpdateManyWithoutPedidoInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoItemCreateManyCarritoInput = {
    idProducto: number
    cantidad?: number
  }

  export type CarritoItemUpdateWithoutCarritoInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    producto?: ProductoUpdateOneRequiredWithoutItemsCarritoNestedInput
  }

  export type CarritoItemUncheckedUpdateWithoutCarritoInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
  }

  export type CarritoItemUncheckedUpdateManyWithoutCarritoInput = {
    idProducto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}