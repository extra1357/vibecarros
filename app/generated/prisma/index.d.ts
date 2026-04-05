
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Anuncio
 * 
 */
export type Anuncio = $Result.DefaultSelection<Prisma.$AnuncioPayload>
/**
 * Model Foto
 * 
 */
export type Foto = $Result.DefaultSelection<Prisma.$FotoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.anuncio`: Exposes CRUD operations for the **Anuncio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Anuncios
    * const anuncios = await prisma.anuncio.findMany()
    * ```
    */
  get anuncio(): Prisma.AnuncioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foto`: Exposes CRUD operations for the **Foto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fotos
    * const fotos = await prisma.foto.findMany()
    * ```
    */
  get foto(): Prisma.FotoDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    Anuncio: 'Anuncio',
    Foto: 'Foto'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "anuncio" | "foto"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Anuncio: {
        payload: Prisma.$AnuncioPayload<ExtArgs>
        fields: Prisma.AnuncioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnuncioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnuncioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>
          }
          findFirst: {
            args: Prisma.AnuncioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnuncioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>
          }
          findMany: {
            args: Prisma.AnuncioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>[]
          }
          create: {
            args: Prisma.AnuncioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>
          }
          createMany: {
            args: Prisma.AnuncioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnuncioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>[]
          }
          delete: {
            args: Prisma.AnuncioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>
          }
          update: {
            args: Prisma.AnuncioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>
          }
          deleteMany: {
            args: Prisma.AnuncioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnuncioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnuncioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>[]
          }
          upsert: {
            args: Prisma.AnuncioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnuncioPayload>
          }
          aggregate: {
            args: Prisma.AnuncioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnuncio>
          }
          groupBy: {
            args: Prisma.AnuncioGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnuncioGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnuncioCountArgs<ExtArgs>
            result: $Utils.Optional<AnuncioCountAggregateOutputType> | number
          }
        }
      }
      Foto: {
        payload: Prisma.$FotoPayload<ExtArgs>
        fields: Prisma.FotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          findFirst: {
            args: Prisma.FotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          findMany: {
            args: Prisma.FotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>[]
          }
          create: {
            args: Prisma.FotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          createMany: {
            args: Prisma.FotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>[]
          }
          delete: {
            args: Prisma.FotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          update: {
            args: Prisma.FotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          deleteMany: {
            args: Prisma.FotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>[]
          }
          upsert: {
            args: Prisma.FotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          aggregate: {
            args: Prisma.FotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoto>
          }
          groupBy: {
            args: Prisma.FotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.FotoCountArgs<ExtArgs>
            result: $Utils.Optional<FotoCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    anuncio?: AnuncioOmit
    foto?: FotoOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    anuncios: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anuncios?: boolean | UserCountOutputTypeCountAnunciosArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnunciosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnuncioWhereInput
  }


  /**
   * Count Type AnuncioCountOutputType
   */

  export type AnuncioCountOutputType = {
    fotos: number
  }

  export type AnuncioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fotos?: boolean | AnuncioCountOutputTypeCountFotosArgs
  }

  // Custom InputTypes
  /**
   * AnuncioCountOutputType without action
   */
  export type AnuncioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnuncioCountOutputType
     */
    select?: AnuncioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnuncioCountOutputType without action
   */
  export type AnuncioCountOutputTypeCountFotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FotoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    whatsapp: string | null
    documento: string | null
    tipDoc: string | null
    cidade: string | null
    estado: string | null
    plano: string | null
    ativo: boolean | null
    criadoEm: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    whatsapp: string | null
    documento: string | null
    tipDoc: string | null
    cidade: string | null
    estado: string | null
    plano: string | null
    ativo: boolean | null
    criadoEm: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    whatsapp: number
    documento: number
    tipDoc: number
    cidade: number
    estado: number
    plano: number
    ativo: number
    criadoEm: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    whatsapp?: true
    documento?: true
    tipDoc?: true
    cidade?: true
    estado?: true
    plano?: true
    ativo?: true
    criadoEm?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    whatsapp?: true
    documento?: true
    tipDoc?: true
    cidade?: true
    estado?: true
    plano?: true
    ativo?: true
    criadoEm?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    whatsapp?: true
    documento?: true
    tipDoc?: true
    cidade?: true
    estado?: true
    plano?: true
    ativo?: true
    criadoEm?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nome: string
    email: string
    senha: string
    whatsapp: string | null
    documento: string
    tipDoc: string
    cidade: string | null
    estado: string | null
    plano: string
    ativo: boolean
    criadoEm: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    whatsapp?: boolean
    documento?: boolean
    tipDoc?: boolean
    cidade?: boolean
    estado?: boolean
    plano?: boolean
    ativo?: boolean
    criadoEm?: boolean
    anuncios?: boolean | User$anunciosArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    whatsapp?: boolean
    documento?: boolean
    tipDoc?: boolean
    cidade?: boolean
    estado?: boolean
    plano?: boolean
    ativo?: boolean
    criadoEm?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    whatsapp?: boolean
    documento?: boolean
    tipDoc?: boolean
    cidade?: boolean
    estado?: boolean
    plano?: boolean
    ativo?: boolean
    criadoEm?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    whatsapp?: boolean
    documento?: boolean
    tipDoc?: boolean
    cidade?: boolean
    estado?: boolean
    plano?: boolean
    ativo?: boolean
    criadoEm?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "whatsapp" | "documento" | "tipDoc" | "cidade" | "estado" | "plano" | "ativo" | "criadoEm", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anuncios?: boolean | User$anunciosArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      anuncios: Prisma.$AnuncioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      email: string
      senha: string
      whatsapp: string | null
      documento: string
      tipDoc: string
      cidade: string | null
      estado: string | null
      plano: string
      ativo: boolean
      criadoEm: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    anuncios<T extends User$anunciosArgs<ExtArgs> = {}>(args?: Subset<T, User$anunciosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly senha: FieldRef<"User", 'String'>
    readonly whatsapp: FieldRef<"User", 'String'>
    readonly documento: FieldRef<"User", 'String'>
    readonly tipDoc: FieldRef<"User", 'String'>
    readonly cidade: FieldRef<"User", 'String'>
    readonly estado: FieldRef<"User", 'String'>
    readonly plano: FieldRef<"User", 'String'>
    readonly ativo: FieldRef<"User", 'Boolean'>
    readonly criadoEm: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.anuncios
   */
  export type User$anunciosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    where?: AnuncioWhereInput
    orderBy?: AnuncioOrderByWithRelationInput | AnuncioOrderByWithRelationInput[]
    cursor?: AnuncioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnuncioScalarFieldEnum | AnuncioScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Anuncio
   */

  export type AggregateAnuncio = {
    _count: AnuncioCountAggregateOutputType | null
    _avg: AnuncioAvgAggregateOutputType | null
    _sum: AnuncioSumAggregateOutputType | null
    _min: AnuncioMinAggregateOutputType | null
    _max: AnuncioMaxAggregateOutputType | null
  }

  export type AnuncioAvgAggregateOutputType = {
    anoFab: number | null
    anoMod: number | null
    km: number | null
    portas: number | null
    preco: number | null
    fipe: number | null
  }

  export type AnuncioSumAggregateOutputType = {
    anoFab: number | null
    anoMod: number | null
    km: number | null
    portas: number | null
    preco: number | null
    fipe: number | null
  }

  export type AnuncioMinAggregateOutputType = {
    id: string | null
    titulo: string | null
    categoria: string | null
    marca: string | null
    modelo: string | null
    versao: string | null
    anoFab: number | null
    anoMod: number | null
    km: number | null
    combustivel: string | null
    cambio: string | null
    cor: string | null
    portas: number | null
    blindado: boolean | null
    financiamento: boolean | null
    troca: boolean | null
    preco: number | null
    fipe: number | null
    placa: string | null
    descricao: string | null
    plano: string | null
    ativo: boolean | null
    destaque: boolean | null
    criadoEm: Date | null
    expiraEm: Date | null
    userId: string | null
  }

  export type AnuncioMaxAggregateOutputType = {
    id: string | null
    titulo: string | null
    categoria: string | null
    marca: string | null
    modelo: string | null
    versao: string | null
    anoFab: number | null
    anoMod: number | null
    km: number | null
    combustivel: string | null
    cambio: string | null
    cor: string | null
    portas: number | null
    blindado: boolean | null
    financiamento: boolean | null
    troca: boolean | null
    preco: number | null
    fipe: number | null
    placa: string | null
    descricao: string | null
    plano: string | null
    ativo: boolean | null
    destaque: boolean | null
    criadoEm: Date | null
    expiraEm: Date | null
    userId: string | null
  }

  export type AnuncioCountAggregateOutputType = {
    id: number
    titulo: number
    categoria: number
    marca: number
    modelo: number
    versao: number
    anoFab: number
    anoMod: number
    km: number
    combustivel: number
    cambio: number
    cor: number
    portas: number
    blindado: number
    financiamento: number
    troca: number
    preco: number
    fipe: number
    placa: number
    descricao: number
    plano: number
    ativo: number
    destaque: number
    criadoEm: number
    expiraEm: number
    userId: number
    _all: number
  }


  export type AnuncioAvgAggregateInputType = {
    anoFab?: true
    anoMod?: true
    km?: true
    portas?: true
    preco?: true
    fipe?: true
  }

  export type AnuncioSumAggregateInputType = {
    anoFab?: true
    anoMod?: true
    km?: true
    portas?: true
    preco?: true
    fipe?: true
  }

  export type AnuncioMinAggregateInputType = {
    id?: true
    titulo?: true
    categoria?: true
    marca?: true
    modelo?: true
    versao?: true
    anoFab?: true
    anoMod?: true
    km?: true
    combustivel?: true
    cambio?: true
    cor?: true
    portas?: true
    blindado?: true
    financiamento?: true
    troca?: true
    preco?: true
    fipe?: true
    placa?: true
    descricao?: true
    plano?: true
    ativo?: true
    destaque?: true
    criadoEm?: true
    expiraEm?: true
    userId?: true
  }

  export type AnuncioMaxAggregateInputType = {
    id?: true
    titulo?: true
    categoria?: true
    marca?: true
    modelo?: true
    versao?: true
    anoFab?: true
    anoMod?: true
    km?: true
    combustivel?: true
    cambio?: true
    cor?: true
    portas?: true
    blindado?: true
    financiamento?: true
    troca?: true
    preco?: true
    fipe?: true
    placa?: true
    descricao?: true
    plano?: true
    ativo?: true
    destaque?: true
    criadoEm?: true
    expiraEm?: true
    userId?: true
  }

  export type AnuncioCountAggregateInputType = {
    id?: true
    titulo?: true
    categoria?: true
    marca?: true
    modelo?: true
    versao?: true
    anoFab?: true
    anoMod?: true
    km?: true
    combustivel?: true
    cambio?: true
    cor?: true
    portas?: true
    blindado?: true
    financiamento?: true
    troca?: true
    preco?: true
    fipe?: true
    placa?: true
    descricao?: true
    plano?: true
    ativo?: true
    destaque?: true
    criadoEm?: true
    expiraEm?: true
    userId?: true
    _all?: true
  }

  export type AnuncioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anuncio to aggregate.
     */
    where?: AnuncioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: AnuncioOrderByWithRelationInput | AnuncioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnuncioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Anuncios
    **/
    _count?: true | AnuncioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnuncioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnuncioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnuncioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnuncioMaxAggregateInputType
  }

  export type GetAnuncioAggregateType<T extends AnuncioAggregateArgs> = {
        [P in keyof T & keyof AggregateAnuncio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnuncio[P]>
      : GetScalarType<T[P], AggregateAnuncio[P]>
  }




  export type AnuncioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnuncioWhereInput
    orderBy?: AnuncioOrderByWithAggregationInput | AnuncioOrderByWithAggregationInput[]
    by: AnuncioScalarFieldEnum[] | AnuncioScalarFieldEnum
    having?: AnuncioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnuncioCountAggregateInputType | true
    _avg?: AnuncioAvgAggregateInputType
    _sum?: AnuncioSumAggregateInputType
    _min?: AnuncioMinAggregateInputType
    _max?: AnuncioMaxAggregateInputType
  }

  export type AnuncioGroupByOutputType = {
    id: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas: number | null
    blindado: boolean
    financiamento: boolean
    troca: boolean
    preco: number
    fipe: number | null
    placa: string | null
    descricao: string | null
    plano: string
    ativo: boolean
    destaque: boolean
    criadoEm: Date
    expiraEm: Date | null
    userId: string
    _count: AnuncioCountAggregateOutputType | null
    _avg: AnuncioAvgAggregateOutputType | null
    _sum: AnuncioSumAggregateOutputType | null
    _min: AnuncioMinAggregateOutputType | null
    _max: AnuncioMaxAggregateOutputType | null
  }

  type GetAnuncioGroupByPayload<T extends AnuncioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnuncioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnuncioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnuncioGroupByOutputType[P]>
            : GetScalarType<T[P], AnuncioGroupByOutputType[P]>
        }
      >
    >


  export type AnuncioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    categoria?: boolean
    marca?: boolean
    modelo?: boolean
    versao?: boolean
    anoFab?: boolean
    anoMod?: boolean
    km?: boolean
    combustivel?: boolean
    cambio?: boolean
    cor?: boolean
    portas?: boolean
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco?: boolean
    fipe?: boolean
    placa?: boolean
    descricao?: boolean
    plano?: boolean
    ativo?: boolean
    destaque?: boolean
    criadoEm?: boolean
    expiraEm?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    fotos?: boolean | Anuncio$fotosArgs<ExtArgs>
    _count?: boolean | AnuncioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anuncio"]>

  export type AnuncioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    categoria?: boolean
    marca?: boolean
    modelo?: boolean
    versao?: boolean
    anoFab?: boolean
    anoMod?: boolean
    km?: boolean
    combustivel?: boolean
    cambio?: boolean
    cor?: boolean
    portas?: boolean
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco?: boolean
    fipe?: boolean
    placa?: boolean
    descricao?: boolean
    plano?: boolean
    ativo?: boolean
    destaque?: boolean
    criadoEm?: boolean
    expiraEm?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anuncio"]>

  export type AnuncioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    categoria?: boolean
    marca?: boolean
    modelo?: boolean
    versao?: boolean
    anoFab?: boolean
    anoMod?: boolean
    km?: boolean
    combustivel?: boolean
    cambio?: boolean
    cor?: boolean
    portas?: boolean
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco?: boolean
    fipe?: boolean
    placa?: boolean
    descricao?: boolean
    plano?: boolean
    ativo?: boolean
    destaque?: boolean
    criadoEm?: boolean
    expiraEm?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anuncio"]>

  export type AnuncioSelectScalar = {
    id?: boolean
    titulo?: boolean
    categoria?: boolean
    marca?: boolean
    modelo?: boolean
    versao?: boolean
    anoFab?: boolean
    anoMod?: boolean
    km?: boolean
    combustivel?: boolean
    cambio?: boolean
    cor?: boolean
    portas?: boolean
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco?: boolean
    fipe?: boolean
    placa?: boolean
    descricao?: boolean
    plano?: boolean
    ativo?: boolean
    destaque?: boolean
    criadoEm?: boolean
    expiraEm?: boolean
    userId?: boolean
  }

  export type AnuncioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "categoria" | "marca" | "modelo" | "versao" | "anoFab" | "anoMod" | "km" | "combustivel" | "cambio" | "cor" | "portas" | "blindado" | "financiamento" | "troca" | "preco" | "fipe" | "placa" | "descricao" | "plano" | "ativo" | "destaque" | "criadoEm" | "expiraEm" | "userId", ExtArgs["result"]["anuncio"]>
  export type AnuncioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    fotos?: boolean | Anuncio$fotosArgs<ExtArgs>
    _count?: boolean | AnuncioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnuncioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnuncioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnuncioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Anuncio"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      fotos: Prisma.$FotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titulo: string
      categoria: string
      marca: string
      modelo: string
      versao: string | null
      anoFab: number
      anoMod: number
      km: number
      combustivel: string
      cambio: string
      cor: string
      portas: number | null
      blindado: boolean
      financiamento: boolean
      troca: boolean
      preco: number
      fipe: number | null
      placa: string | null
      descricao: string | null
      plano: string
      ativo: boolean
      destaque: boolean
      criadoEm: Date
      expiraEm: Date | null
      userId: string
    }, ExtArgs["result"]["anuncio"]>
    composites: {}
  }

  type AnuncioGetPayload<S extends boolean | null | undefined | AnuncioDefaultArgs> = $Result.GetResult<Prisma.$AnuncioPayload, S>

  type AnuncioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnuncioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnuncioCountAggregateInputType | true
    }

  export interface AnuncioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Anuncio'], meta: { name: 'Anuncio' } }
    /**
     * Find zero or one Anuncio that matches the filter.
     * @param {AnuncioFindUniqueArgs} args - Arguments to find a Anuncio
     * @example
     * // Get one Anuncio
     * const anuncio = await prisma.anuncio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnuncioFindUniqueArgs>(args: SelectSubset<T, AnuncioFindUniqueArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Anuncio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnuncioFindUniqueOrThrowArgs} args - Arguments to find a Anuncio
     * @example
     * // Get one Anuncio
     * const anuncio = await prisma.anuncio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnuncioFindUniqueOrThrowArgs>(args: SelectSubset<T, AnuncioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Anuncio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioFindFirstArgs} args - Arguments to find a Anuncio
     * @example
     * // Get one Anuncio
     * const anuncio = await prisma.anuncio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnuncioFindFirstArgs>(args?: SelectSubset<T, AnuncioFindFirstArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Anuncio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioFindFirstOrThrowArgs} args - Arguments to find a Anuncio
     * @example
     * // Get one Anuncio
     * const anuncio = await prisma.anuncio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnuncioFindFirstOrThrowArgs>(args?: SelectSubset<T, AnuncioFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Anuncios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Anuncios
     * const anuncios = await prisma.anuncio.findMany()
     * 
     * // Get first 10 Anuncios
     * const anuncios = await prisma.anuncio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anuncioWithIdOnly = await prisma.anuncio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnuncioFindManyArgs>(args?: SelectSubset<T, AnuncioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Anuncio.
     * @param {AnuncioCreateArgs} args - Arguments to create a Anuncio.
     * @example
     * // Create one Anuncio
     * const Anuncio = await prisma.anuncio.create({
     *   data: {
     *     // ... data to create a Anuncio
     *   }
     * })
     * 
     */
    create<T extends AnuncioCreateArgs>(args: SelectSubset<T, AnuncioCreateArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Anuncios.
     * @param {AnuncioCreateManyArgs} args - Arguments to create many Anuncios.
     * @example
     * // Create many Anuncios
     * const anuncio = await prisma.anuncio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnuncioCreateManyArgs>(args?: SelectSubset<T, AnuncioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Anuncios and returns the data saved in the database.
     * @param {AnuncioCreateManyAndReturnArgs} args - Arguments to create many Anuncios.
     * @example
     * // Create many Anuncios
     * const anuncio = await prisma.anuncio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Anuncios and only return the `id`
     * const anuncioWithIdOnly = await prisma.anuncio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnuncioCreateManyAndReturnArgs>(args?: SelectSubset<T, AnuncioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Anuncio.
     * @param {AnuncioDeleteArgs} args - Arguments to delete one Anuncio.
     * @example
     * // Delete one Anuncio
     * const Anuncio = await prisma.anuncio.delete({
     *   where: {
     *     // ... filter to delete one Anuncio
     *   }
     * })
     * 
     */
    delete<T extends AnuncioDeleteArgs>(args: SelectSubset<T, AnuncioDeleteArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Anuncio.
     * @param {AnuncioUpdateArgs} args - Arguments to update one Anuncio.
     * @example
     * // Update one Anuncio
     * const anuncio = await prisma.anuncio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnuncioUpdateArgs>(args: SelectSubset<T, AnuncioUpdateArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Anuncios.
     * @param {AnuncioDeleteManyArgs} args - Arguments to filter Anuncios to delete.
     * @example
     * // Delete a few Anuncios
     * const { count } = await prisma.anuncio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnuncioDeleteManyArgs>(args?: SelectSubset<T, AnuncioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anuncios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Anuncios
     * const anuncio = await prisma.anuncio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnuncioUpdateManyArgs>(args: SelectSubset<T, AnuncioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anuncios and returns the data updated in the database.
     * @param {AnuncioUpdateManyAndReturnArgs} args - Arguments to update many Anuncios.
     * @example
     * // Update many Anuncios
     * const anuncio = await prisma.anuncio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Anuncios and only return the `id`
     * const anuncioWithIdOnly = await prisma.anuncio.updateManyAndReturn({
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
    updateManyAndReturn<T extends AnuncioUpdateManyAndReturnArgs>(args: SelectSubset<T, AnuncioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Anuncio.
     * @param {AnuncioUpsertArgs} args - Arguments to update or create a Anuncio.
     * @example
     * // Update or create a Anuncio
     * const anuncio = await prisma.anuncio.upsert({
     *   create: {
     *     // ... data to create a Anuncio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Anuncio we want to update
     *   }
     * })
     */
    upsert<T extends AnuncioUpsertArgs>(args: SelectSubset<T, AnuncioUpsertArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Anuncios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioCountArgs} args - Arguments to filter Anuncios to count.
     * @example
     * // Count the number of Anuncios
     * const count = await prisma.anuncio.count({
     *   where: {
     *     // ... the filter for the Anuncios we want to count
     *   }
     * })
    **/
    count<T extends AnuncioCountArgs>(
      args?: Subset<T, AnuncioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnuncioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Anuncio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnuncioAggregateArgs>(args: Subset<T, AnuncioAggregateArgs>): Prisma.PrismaPromise<GetAnuncioAggregateType<T>>

    /**
     * Group by Anuncio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnuncioGroupByArgs} args - Group by arguments.
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
      T extends AnuncioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnuncioGroupByArgs['orderBy'] }
        : { orderBy?: AnuncioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnuncioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnuncioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Anuncio model
   */
  readonly fields: AnuncioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Anuncio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnuncioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fotos<T extends Anuncio$fotosArgs<ExtArgs> = {}>(args?: Subset<T, Anuncio$fotosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Anuncio model
   */
  interface AnuncioFieldRefs {
    readonly id: FieldRef<"Anuncio", 'String'>
    readonly titulo: FieldRef<"Anuncio", 'String'>
    readonly categoria: FieldRef<"Anuncio", 'String'>
    readonly marca: FieldRef<"Anuncio", 'String'>
    readonly modelo: FieldRef<"Anuncio", 'String'>
    readonly versao: FieldRef<"Anuncio", 'String'>
    readonly anoFab: FieldRef<"Anuncio", 'Int'>
    readonly anoMod: FieldRef<"Anuncio", 'Int'>
    readonly km: FieldRef<"Anuncio", 'Int'>
    readonly combustivel: FieldRef<"Anuncio", 'String'>
    readonly cambio: FieldRef<"Anuncio", 'String'>
    readonly cor: FieldRef<"Anuncio", 'String'>
    readonly portas: FieldRef<"Anuncio", 'Int'>
    readonly blindado: FieldRef<"Anuncio", 'Boolean'>
    readonly financiamento: FieldRef<"Anuncio", 'Boolean'>
    readonly troca: FieldRef<"Anuncio", 'Boolean'>
    readonly preco: FieldRef<"Anuncio", 'Float'>
    readonly fipe: FieldRef<"Anuncio", 'Float'>
    readonly placa: FieldRef<"Anuncio", 'String'>
    readonly descricao: FieldRef<"Anuncio", 'String'>
    readonly plano: FieldRef<"Anuncio", 'String'>
    readonly ativo: FieldRef<"Anuncio", 'Boolean'>
    readonly destaque: FieldRef<"Anuncio", 'Boolean'>
    readonly criadoEm: FieldRef<"Anuncio", 'DateTime'>
    readonly expiraEm: FieldRef<"Anuncio", 'DateTime'>
    readonly userId: FieldRef<"Anuncio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Anuncio findUnique
   */
  export type AnuncioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * Filter, which Anuncio to fetch.
     */
    where: AnuncioWhereUniqueInput
  }

  /**
   * Anuncio findUniqueOrThrow
   */
  export type AnuncioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * Filter, which Anuncio to fetch.
     */
    where: AnuncioWhereUniqueInput
  }

  /**
   * Anuncio findFirst
   */
  export type AnuncioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * Filter, which Anuncio to fetch.
     */
    where?: AnuncioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: AnuncioOrderByWithRelationInput | AnuncioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anuncios.
     */
    cursor?: AnuncioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anuncios.
     */
    distinct?: AnuncioScalarFieldEnum | AnuncioScalarFieldEnum[]
  }

  /**
   * Anuncio findFirstOrThrow
   */
  export type AnuncioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * Filter, which Anuncio to fetch.
     */
    where?: AnuncioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: AnuncioOrderByWithRelationInput | AnuncioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anuncios.
     */
    cursor?: AnuncioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anuncios.
     */
    distinct?: AnuncioScalarFieldEnum | AnuncioScalarFieldEnum[]
  }

  /**
   * Anuncio findMany
   */
  export type AnuncioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * Filter, which Anuncios to fetch.
     */
    where?: AnuncioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: AnuncioOrderByWithRelationInput | AnuncioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Anuncios.
     */
    cursor?: AnuncioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anuncios.
     */
    distinct?: AnuncioScalarFieldEnum | AnuncioScalarFieldEnum[]
  }

  /**
   * Anuncio create
   */
  export type AnuncioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * The data needed to create a Anuncio.
     */
    data: XOR<AnuncioCreateInput, AnuncioUncheckedCreateInput>
  }

  /**
   * Anuncio createMany
   */
  export type AnuncioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Anuncios.
     */
    data: AnuncioCreateManyInput | AnuncioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Anuncio createManyAndReturn
   */
  export type AnuncioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * The data used to create many Anuncios.
     */
    data: AnuncioCreateManyInput | AnuncioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Anuncio update
   */
  export type AnuncioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * The data needed to update a Anuncio.
     */
    data: XOR<AnuncioUpdateInput, AnuncioUncheckedUpdateInput>
    /**
     * Choose, which Anuncio to update.
     */
    where: AnuncioWhereUniqueInput
  }

  /**
   * Anuncio updateMany
   */
  export type AnuncioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Anuncios.
     */
    data: XOR<AnuncioUpdateManyMutationInput, AnuncioUncheckedUpdateManyInput>
    /**
     * Filter which Anuncios to update
     */
    where?: AnuncioWhereInput
    /**
     * Limit how many Anuncios to update.
     */
    limit?: number
  }

  /**
   * Anuncio updateManyAndReturn
   */
  export type AnuncioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * The data used to update Anuncios.
     */
    data: XOR<AnuncioUpdateManyMutationInput, AnuncioUncheckedUpdateManyInput>
    /**
     * Filter which Anuncios to update
     */
    where?: AnuncioWhereInput
    /**
     * Limit how many Anuncios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Anuncio upsert
   */
  export type AnuncioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * The filter to search for the Anuncio to update in case it exists.
     */
    where: AnuncioWhereUniqueInput
    /**
     * In case the Anuncio found by the `where` argument doesn't exist, create a new Anuncio with this data.
     */
    create: XOR<AnuncioCreateInput, AnuncioUncheckedCreateInput>
    /**
     * In case the Anuncio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnuncioUpdateInput, AnuncioUncheckedUpdateInput>
  }

  /**
   * Anuncio delete
   */
  export type AnuncioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
    /**
     * Filter which Anuncio to delete.
     */
    where: AnuncioWhereUniqueInput
  }

  /**
   * Anuncio deleteMany
   */
  export type AnuncioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anuncios to delete
     */
    where?: AnuncioWhereInput
    /**
     * Limit how many Anuncios to delete.
     */
    limit?: number
  }

  /**
   * Anuncio.fotos
   */
  export type Anuncio$fotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    where?: FotoWhereInput
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    cursor?: FotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Anuncio without action
   */
  export type AnuncioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncio
     */
    select?: AnuncioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anuncio
     */
    omit?: AnuncioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnuncioInclude<ExtArgs> | null
  }


  /**
   * Model Foto
   */

  export type AggregateFoto = {
    _count: FotoCountAggregateOutputType | null
    _min: FotoMinAggregateOutputType | null
    _max: FotoMaxAggregateOutputType | null
  }

  export type FotoMinAggregateOutputType = {
    id: string | null
    url: string | null
    capa: boolean | null
    anuncioId: string | null
  }

  export type FotoMaxAggregateOutputType = {
    id: string | null
    url: string | null
    capa: boolean | null
    anuncioId: string | null
  }

  export type FotoCountAggregateOutputType = {
    id: number
    url: number
    capa: number
    anuncioId: number
    _all: number
  }


  export type FotoMinAggregateInputType = {
    id?: true
    url?: true
    capa?: true
    anuncioId?: true
  }

  export type FotoMaxAggregateInputType = {
    id?: true
    url?: true
    capa?: true
    anuncioId?: true
  }

  export type FotoCountAggregateInputType = {
    id?: true
    url?: true
    capa?: true
    anuncioId?: true
    _all?: true
  }

  export type FotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foto to aggregate.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fotos
    **/
    _count?: true | FotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FotoMaxAggregateInputType
  }

  export type GetFotoAggregateType<T extends FotoAggregateArgs> = {
        [P in keyof T & keyof AggregateFoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoto[P]>
      : GetScalarType<T[P], AggregateFoto[P]>
  }




  export type FotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FotoWhereInput
    orderBy?: FotoOrderByWithAggregationInput | FotoOrderByWithAggregationInput[]
    by: FotoScalarFieldEnum[] | FotoScalarFieldEnum
    having?: FotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FotoCountAggregateInputType | true
    _min?: FotoMinAggregateInputType
    _max?: FotoMaxAggregateInputType
  }

  export type FotoGroupByOutputType = {
    id: string
    url: string
    capa: boolean
    anuncioId: string
    _count: FotoCountAggregateOutputType | null
    _min: FotoMinAggregateOutputType | null
    _max: FotoMaxAggregateOutputType | null
  }

  type GetFotoGroupByPayload<T extends FotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FotoGroupByOutputType[P]>
            : GetScalarType<T[P], FotoGroupByOutputType[P]>
        }
      >
    >


  export type FotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    capa?: boolean
    anuncioId?: boolean
    anuncio?: boolean | AnuncioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foto"]>

  export type FotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    capa?: boolean
    anuncioId?: boolean
    anuncio?: boolean | AnuncioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foto"]>

  export type FotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    capa?: boolean
    anuncioId?: boolean
    anuncio?: boolean | AnuncioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foto"]>

  export type FotoSelectScalar = {
    id?: boolean
    url?: boolean
    capa?: boolean
    anuncioId?: boolean
  }

  export type FotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "capa" | "anuncioId", ExtArgs["result"]["foto"]>
  export type FotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anuncio?: boolean | AnuncioDefaultArgs<ExtArgs>
  }
  export type FotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anuncio?: boolean | AnuncioDefaultArgs<ExtArgs>
  }
  export type FotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anuncio?: boolean | AnuncioDefaultArgs<ExtArgs>
  }

  export type $FotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Foto"
    objects: {
      anuncio: Prisma.$AnuncioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      capa: boolean
      anuncioId: string
    }, ExtArgs["result"]["foto"]>
    composites: {}
  }

  type FotoGetPayload<S extends boolean | null | undefined | FotoDefaultArgs> = $Result.GetResult<Prisma.$FotoPayload, S>

  type FotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FotoCountAggregateInputType | true
    }

  export interface FotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Foto'], meta: { name: 'Foto' } }
    /**
     * Find zero or one Foto that matches the filter.
     * @param {FotoFindUniqueArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FotoFindUniqueArgs>(args: SelectSubset<T, FotoFindUniqueArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Foto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FotoFindUniqueOrThrowArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FotoFindUniqueOrThrowArgs>(args: SelectSubset<T, FotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Foto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoFindFirstArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FotoFindFirstArgs>(args?: SelectSubset<T, FotoFindFirstArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Foto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoFindFirstOrThrowArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FotoFindFirstOrThrowArgs>(args?: SelectSubset<T, FotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fotos
     * const fotos = await prisma.foto.findMany()
     * 
     * // Get first 10 Fotos
     * const fotos = await prisma.foto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fotoWithIdOnly = await prisma.foto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FotoFindManyArgs>(args?: SelectSubset<T, FotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Foto.
     * @param {FotoCreateArgs} args - Arguments to create a Foto.
     * @example
     * // Create one Foto
     * const Foto = await prisma.foto.create({
     *   data: {
     *     // ... data to create a Foto
     *   }
     * })
     * 
     */
    create<T extends FotoCreateArgs>(args: SelectSubset<T, FotoCreateArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fotos.
     * @param {FotoCreateManyArgs} args - Arguments to create many Fotos.
     * @example
     * // Create many Fotos
     * const foto = await prisma.foto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FotoCreateManyArgs>(args?: SelectSubset<T, FotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fotos and returns the data saved in the database.
     * @param {FotoCreateManyAndReturnArgs} args - Arguments to create many Fotos.
     * @example
     * // Create many Fotos
     * const foto = await prisma.foto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fotos and only return the `id`
     * const fotoWithIdOnly = await prisma.foto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FotoCreateManyAndReturnArgs>(args?: SelectSubset<T, FotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Foto.
     * @param {FotoDeleteArgs} args - Arguments to delete one Foto.
     * @example
     * // Delete one Foto
     * const Foto = await prisma.foto.delete({
     *   where: {
     *     // ... filter to delete one Foto
     *   }
     * })
     * 
     */
    delete<T extends FotoDeleteArgs>(args: SelectSubset<T, FotoDeleteArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Foto.
     * @param {FotoUpdateArgs} args - Arguments to update one Foto.
     * @example
     * // Update one Foto
     * const foto = await prisma.foto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FotoUpdateArgs>(args: SelectSubset<T, FotoUpdateArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fotos.
     * @param {FotoDeleteManyArgs} args - Arguments to filter Fotos to delete.
     * @example
     * // Delete a few Fotos
     * const { count } = await prisma.foto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FotoDeleteManyArgs>(args?: SelectSubset<T, FotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fotos
     * const foto = await prisma.foto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FotoUpdateManyArgs>(args: SelectSubset<T, FotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fotos and returns the data updated in the database.
     * @param {FotoUpdateManyAndReturnArgs} args - Arguments to update many Fotos.
     * @example
     * // Update many Fotos
     * const foto = await prisma.foto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fotos and only return the `id`
     * const fotoWithIdOnly = await prisma.foto.updateManyAndReturn({
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
    updateManyAndReturn<T extends FotoUpdateManyAndReturnArgs>(args: SelectSubset<T, FotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Foto.
     * @param {FotoUpsertArgs} args - Arguments to update or create a Foto.
     * @example
     * // Update or create a Foto
     * const foto = await prisma.foto.upsert({
     *   create: {
     *     // ... data to create a Foto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Foto we want to update
     *   }
     * })
     */
    upsert<T extends FotoUpsertArgs>(args: SelectSubset<T, FotoUpsertArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoCountArgs} args - Arguments to filter Fotos to count.
     * @example
     * // Count the number of Fotos
     * const count = await prisma.foto.count({
     *   where: {
     *     // ... the filter for the Fotos we want to count
     *   }
     * })
    **/
    count<T extends FotoCountArgs>(
      args?: Subset<T, FotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Foto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FotoAggregateArgs>(args: Subset<T, FotoAggregateArgs>): Prisma.PrismaPromise<GetFotoAggregateType<T>>

    /**
     * Group by Foto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoGroupByArgs} args - Group by arguments.
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
      T extends FotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FotoGroupByArgs['orderBy'] }
        : { orderBy?: FotoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Foto model
   */
  readonly fields: FotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Foto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    anuncio<T extends AnuncioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnuncioDefaultArgs<ExtArgs>>): Prisma__AnuncioClient<$Result.GetResult<Prisma.$AnuncioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Foto model
   */
  interface FotoFieldRefs {
    readonly id: FieldRef<"Foto", 'String'>
    readonly url: FieldRef<"Foto", 'String'>
    readonly capa: FieldRef<"Foto", 'Boolean'>
    readonly anuncioId: FieldRef<"Foto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Foto findUnique
   */
  export type FotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto findUniqueOrThrow
   */
  export type FotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto findFirst
   */
  export type FotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fotos.
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fotos.
     */
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Foto findFirstOrThrow
   */
  export type FotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fotos.
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fotos.
     */
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Foto findMany
   */
  export type FotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Fotos to fetch.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fotos.
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fotos.
     */
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Foto create
   */
  export type FotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * The data needed to create a Foto.
     */
    data: XOR<FotoCreateInput, FotoUncheckedCreateInput>
  }

  /**
   * Foto createMany
   */
  export type FotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fotos.
     */
    data: FotoCreateManyInput | FotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Foto createManyAndReturn
   */
  export type FotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * The data used to create many Fotos.
     */
    data: FotoCreateManyInput | FotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Foto update
   */
  export type FotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * The data needed to update a Foto.
     */
    data: XOR<FotoUpdateInput, FotoUncheckedUpdateInput>
    /**
     * Choose, which Foto to update.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto updateMany
   */
  export type FotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fotos.
     */
    data: XOR<FotoUpdateManyMutationInput, FotoUncheckedUpdateManyInput>
    /**
     * Filter which Fotos to update
     */
    where?: FotoWhereInput
    /**
     * Limit how many Fotos to update.
     */
    limit?: number
  }

  /**
   * Foto updateManyAndReturn
   */
  export type FotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * The data used to update Fotos.
     */
    data: XOR<FotoUpdateManyMutationInput, FotoUncheckedUpdateManyInput>
    /**
     * Filter which Fotos to update
     */
    where?: FotoWhereInput
    /**
     * Limit how many Fotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Foto upsert
   */
  export type FotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * The filter to search for the Foto to update in case it exists.
     */
    where: FotoWhereUniqueInput
    /**
     * In case the Foto found by the `where` argument doesn't exist, create a new Foto with this data.
     */
    create: XOR<FotoCreateInput, FotoUncheckedCreateInput>
    /**
     * In case the Foto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FotoUpdateInput, FotoUncheckedUpdateInput>
  }

  /**
   * Foto delete
   */
  export type FotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter which Foto to delete.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto deleteMany
   */
  export type FotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fotos to delete
     */
    where?: FotoWhereInput
    /**
     * Limit how many Fotos to delete.
     */
    limit?: number
  }

  /**
   * Foto without action
   */
  export type FotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    whatsapp: 'whatsapp',
    documento: 'documento',
    tipDoc: 'tipDoc',
    cidade: 'cidade',
    estado: 'estado',
    plano: 'plano',
    ativo: 'ativo',
    criadoEm: 'criadoEm'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AnuncioScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    categoria: 'categoria',
    marca: 'marca',
    modelo: 'modelo',
    versao: 'versao',
    anoFab: 'anoFab',
    anoMod: 'anoMod',
    km: 'km',
    combustivel: 'combustivel',
    cambio: 'cambio',
    cor: 'cor',
    portas: 'portas',
    blindado: 'blindado',
    financiamento: 'financiamento',
    troca: 'troca',
    preco: 'preco',
    fipe: 'fipe',
    placa: 'placa',
    descricao: 'descricao',
    plano: 'plano',
    ativo: 'ativo',
    destaque: 'destaque',
    criadoEm: 'criadoEm',
    expiraEm: 'expiraEm',
    userId: 'userId'
  };

  export type AnuncioScalarFieldEnum = (typeof AnuncioScalarFieldEnum)[keyof typeof AnuncioScalarFieldEnum]


  export const FotoScalarFieldEnum: {
    id: 'id',
    url: 'url',
    capa: 'capa',
    anuncioId: 'anuncioId'
  };

  export type FotoScalarFieldEnum = (typeof FotoScalarFieldEnum)[keyof typeof FotoScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    whatsapp?: StringNullableFilter<"User"> | string | null
    documento?: StringFilter<"User"> | string
    tipDoc?: StringFilter<"User"> | string
    cidade?: StringNullableFilter<"User"> | string | null
    estado?: StringNullableFilter<"User"> | string | null
    plano?: StringFilter<"User"> | string
    ativo?: BoolFilter<"User"> | boolean
    criadoEm?: DateTimeFilter<"User"> | Date | string
    anuncios?: AnuncioListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    whatsapp?: SortOrderInput | SortOrder
    documento?: SortOrder
    tipDoc?: SortOrder
    cidade?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    anuncios?: AnuncioOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    documento?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nome?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    whatsapp?: StringNullableFilter<"User"> | string | null
    tipDoc?: StringFilter<"User"> | string
    cidade?: StringNullableFilter<"User"> | string | null
    estado?: StringNullableFilter<"User"> | string | null
    plano?: StringFilter<"User"> | string
    ativo?: BoolFilter<"User"> | boolean
    criadoEm?: DateTimeFilter<"User"> | Date | string
    anuncios?: AnuncioListRelationFilter
  }, "id" | "email" | "documento">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    whatsapp?: SortOrderInput | SortOrder
    documento?: SortOrder
    tipDoc?: SortOrder
    cidade?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    senha?: StringWithAggregatesFilter<"User"> | string
    whatsapp?: StringNullableWithAggregatesFilter<"User"> | string | null
    documento?: StringWithAggregatesFilter<"User"> | string
    tipDoc?: StringWithAggregatesFilter<"User"> | string
    cidade?: StringNullableWithAggregatesFilter<"User"> | string | null
    estado?: StringNullableWithAggregatesFilter<"User"> | string | null
    plano?: StringWithAggregatesFilter<"User"> | string
    ativo?: BoolWithAggregatesFilter<"User"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AnuncioWhereInput = {
    AND?: AnuncioWhereInput | AnuncioWhereInput[]
    OR?: AnuncioWhereInput[]
    NOT?: AnuncioWhereInput | AnuncioWhereInput[]
    id?: StringFilter<"Anuncio"> | string
    titulo?: StringFilter<"Anuncio"> | string
    categoria?: StringFilter<"Anuncio"> | string
    marca?: StringFilter<"Anuncio"> | string
    modelo?: StringFilter<"Anuncio"> | string
    versao?: StringNullableFilter<"Anuncio"> | string | null
    anoFab?: IntFilter<"Anuncio"> | number
    anoMod?: IntFilter<"Anuncio"> | number
    km?: IntFilter<"Anuncio"> | number
    combustivel?: StringFilter<"Anuncio"> | string
    cambio?: StringFilter<"Anuncio"> | string
    cor?: StringFilter<"Anuncio"> | string
    portas?: IntNullableFilter<"Anuncio"> | number | null
    blindado?: BoolFilter<"Anuncio"> | boolean
    financiamento?: BoolFilter<"Anuncio"> | boolean
    troca?: BoolFilter<"Anuncio"> | boolean
    preco?: FloatFilter<"Anuncio"> | number
    fipe?: FloatNullableFilter<"Anuncio"> | number | null
    placa?: StringNullableFilter<"Anuncio"> | string | null
    descricao?: StringNullableFilter<"Anuncio"> | string | null
    plano?: StringFilter<"Anuncio"> | string
    ativo?: BoolFilter<"Anuncio"> | boolean
    destaque?: BoolFilter<"Anuncio"> | boolean
    criadoEm?: DateTimeFilter<"Anuncio"> | Date | string
    expiraEm?: DateTimeNullableFilter<"Anuncio"> | Date | string | null
    userId?: StringFilter<"Anuncio"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    fotos?: FotoListRelationFilter
  }

  export type AnuncioOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    modelo?: SortOrder
    versao?: SortOrderInput | SortOrder
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    combustivel?: SortOrder
    cambio?: SortOrder
    cor?: SortOrder
    portas?: SortOrderInput | SortOrder
    blindado?: SortOrder
    financiamento?: SortOrder
    troca?: SortOrder
    preco?: SortOrder
    fipe?: SortOrderInput | SortOrder
    placa?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    destaque?: SortOrder
    criadoEm?: SortOrder
    expiraEm?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    fotos?: FotoOrderByRelationAggregateInput
  }

  export type AnuncioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnuncioWhereInput | AnuncioWhereInput[]
    OR?: AnuncioWhereInput[]
    NOT?: AnuncioWhereInput | AnuncioWhereInput[]
    titulo?: StringFilter<"Anuncio"> | string
    categoria?: StringFilter<"Anuncio"> | string
    marca?: StringFilter<"Anuncio"> | string
    modelo?: StringFilter<"Anuncio"> | string
    versao?: StringNullableFilter<"Anuncio"> | string | null
    anoFab?: IntFilter<"Anuncio"> | number
    anoMod?: IntFilter<"Anuncio"> | number
    km?: IntFilter<"Anuncio"> | number
    combustivel?: StringFilter<"Anuncio"> | string
    cambio?: StringFilter<"Anuncio"> | string
    cor?: StringFilter<"Anuncio"> | string
    portas?: IntNullableFilter<"Anuncio"> | number | null
    blindado?: BoolFilter<"Anuncio"> | boolean
    financiamento?: BoolFilter<"Anuncio"> | boolean
    troca?: BoolFilter<"Anuncio"> | boolean
    preco?: FloatFilter<"Anuncio"> | number
    fipe?: FloatNullableFilter<"Anuncio"> | number | null
    placa?: StringNullableFilter<"Anuncio"> | string | null
    descricao?: StringNullableFilter<"Anuncio"> | string | null
    plano?: StringFilter<"Anuncio"> | string
    ativo?: BoolFilter<"Anuncio"> | boolean
    destaque?: BoolFilter<"Anuncio"> | boolean
    criadoEm?: DateTimeFilter<"Anuncio"> | Date | string
    expiraEm?: DateTimeNullableFilter<"Anuncio"> | Date | string | null
    userId?: StringFilter<"Anuncio"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    fotos?: FotoListRelationFilter
  }, "id">

  export type AnuncioOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    modelo?: SortOrder
    versao?: SortOrderInput | SortOrder
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    combustivel?: SortOrder
    cambio?: SortOrder
    cor?: SortOrder
    portas?: SortOrderInput | SortOrder
    blindado?: SortOrder
    financiamento?: SortOrder
    troca?: SortOrder
    preco?: SortOrder
    fipe?: SortOrderInput | SortOrder
    placa?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    destaque?: SortOrder
    criadoEm?: SortOrder
    expiraEm?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: AnuncioCountOrderByAggregateInput
    _avg?: AnuncioAvgOrderByAggregateInput
    _max?: AnuncioMaxOrderByAggregateInput
    _min?: AnuncioMinOrderByAggregateInput
    _sum?: AnuncioSumOrderByAggregateInput
  }

  export type AnuncioScalarWhereWithAggregatesInput = {
    AND?: AnuncioScalarWhereWithAggregatesInput | AnuncioScalarWhereWithAggregatesInput[]
    OR?: AnuncioScalarWhereWithAggregatesInput[]
    NOT?: AnuncioScalarWhereWithAggregatesInput | AnuncioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Anuncio"> | string
    titulo?: StringWithAggregatesFilter<"Anuncio"> | string
    categoria?: StringWithAggregatesFilter<"Anuncio"> | string
    marca?: StringWithAggregatesFilter<"Anuncio"> | string
    modelo?: StringWithAggregatesFilter<"Anuncio"> | string
    versao?: StringNullableWithAggregatesFilter<"Anuncio"> | string | null
    anoFab?: IntWithAggregatesFilter<"Anuncio"> | number
    anoMod?: IntWithAggregatesFilter<"Anuncio"> | number
    km?: IntWithAggregatesFilter<"Anuncio"> | number
    combustivel?: StringWithAggregatesFilter<"Anuncio"> | string
    cambio?: StringWithAggregatesFilter<"Anuncio"> | string
    cor?: StringWithAggregatesFilter<"Anuncio"> | string
    portas?: IntNullableWithAggregatesFilter<"Anuncio"> | number | null
    blindado?: BoolWithAggregatesFilter<"Anuncio"> | boolean
    financiamento?: BoolWithAggregatesFilter<"Anuncio"> | boolean
    troca?: BoolWithAggregatesFilter<"Anuncio"> | boolean
    preco?: FloatWithAggregatesFilter<"Anuncio"> | number
    fipe?: FloatNullableWithAggregatesFilter<"Anuncio"> | number | null
    placa?: StringNullableWithAggregatesFilter<"Anuncio"> | string | null
    descricao?: StringNullableWithAggregatesFilter<"Anuncio"> | string | null
    plano?: StringWithAggregatesFilter<"Anuncio"> | string
    ativo?: BoolWithAggregatesFilter<"Anuncio"> | boolean
    destaque?: BoolWithAggregatesFilter<"Anuncio"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Anuncio"> | Date | string
    expiraEm?: DateTimeNullableWithAggregatesFilter<"Anuncio"> | Date | string | null
    userId?: StringWithAggregatesFilter<"Anuncio"> | string
  }

  export type FotoWhereInput = {
    AND?: FotoWhereInput | FotoWhereInput[]
    OR?: FotoWhereInput[]
    NOT?: FotoWhereInput | FotoWhereInput[]
    id?: StringFilter<"Foto"> | string
    url?: StringFilter<"Foto"> | string
    capa?: BoolFilter<"Foto"> | boolean
    anuncioId?: StringFilter<"Foto"> | string
    anuncio?: XOR<AnuncioScalarRelationFilter, AnuncioWhereInput>
  }

  export type FotoOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    capa?: SortOrder
    anuncioId?: SortOrder
    anuncio?: AnuncioOrderByWithRelationInput
  }

  export type FotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FotoWhereInput | FotoWhereInput[]
    OR?: FotoWhereInput[]
    NOT?: FotoWhereInput | FotoWhereInput[]
    url?: StringFilter<"Foto"> | string
    capa?: BoolFilter<"Foto"> | boolean
    anuncioId?: StringFilter<"Foto"> | string
    anuncio?: XOR<AnuncioScalarRelationFilter, AnuncioWhereInput>
  }, "id">

  export type FotoOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    capa?: SortOrder
    anuncioId?: SortOrder
    _count?: FotoCountOrderByAggregateInput
    _max?: FotoMaxOrderByAggregateInput
    _min?: FotoMinOrderByAggregateInput
  }

  export type FotoScalarWhereWithAggregatesInput = {
    AND?: FotoScalarWhereWithAggregatesInput | FotoScalarWhereWithAggregatesInput[]
    OR?: FotoScalarWhereWithAggregatesInput[]
    NOT?: FotoScalarWhereWithAggregatesInput | FotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Foto"> | string
    url?: StringWithAggregatesFilter<"Foto"> | string
    capa?: BoolWithAggregatesFilter<"Foto"> | boolean
    anuncioId?: StringWithAggregatesFilter<"Foto"> | string
  }

  export type UserCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    whatsapp?: string | null
    documento: string
    tipDoc?: string
    cidade?: string | null
    estado?: string | null
    plano?: string
    ativo?: boolean
    criadoEm?: Date | string
    anuncios?: AnuncioCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    whatsapp?: string | null
    documento: string
    tipDoc?: string
    cidade?: string | null
    estado?: string | null
    plano?: string
    ativo?: boolean
    criadoEm?: Date | string
    anuncios?: AnuncioUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: StringFieldUpdateOperationsInput | string
    tipDoc?: StringFieldUpdateOperationsInput | string
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    anuncios?: AnuncioUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: StringFieldUpdateOperationsInput | string
    tipDoc?: StringFieldUpdateOperationsInput | string
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    anuncios?: AnuncioUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nome: string
    email: string
    senha: string
    whatsapp?: string | null
    documento: string
    tipDoc?: string
    cidade?: string | null
    estado?: string | null
    plano?: string
    ativo?: boolean
    criadoEm?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: StringFieldUpdateOperationsInput | string
    tipDoc?: StringFieldUpdateOperationsInput | string
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: StringFieldUpdateOperationsInput | string
    tipDoc?: StringFieldUpdateOperationsInput | string
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnuncioCreateInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    user: UserCreateNestedOneWithoutAnunciosInput
    fotos?: FotoCreateNestedManyWithoutAnuncioInput
  }

  export type AnuncioUncheckedCreateInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    userId: string
    fotos?: FotoUncheckedCreateNestedManyWithoutAnuncioInput
  }

  export type AnuncioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAnunciosNestedInput
    fotos?: FotoUpdateManyWithoutAnuncioNestedInput
  }

  export type AnuncioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    fotos?: FotoUncheckedUpdateManyWithoutAnuncioNestedInput
  }

  export type AnuncioCreateManyInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    userId: string
  }

  export type AnuncioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnuncioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FotoCreateInput = {
    id?: string
    url: string
    capa?: boolean
    anuncio: AnuncioCreateNestedOneWithoutFotosInput
  }

  export type FotoUncheckedCreateInput = {
    id?: string
    url: string
    capa?: boolean
    anuncioId: string
  }

  export type FotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
    anuncio?: AnuncioUpdateOneRequiredWithoutFotosNestedInput
  }

  export type FotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
    anuncioId?: StringFieldUpdateOperationsInput | string
  }

  export type FotoCreateManyInput = {
    id?: string
    url: string
    capa?: boolean
    anuncioId: string
  }

  export type FotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
    anuncioId?: StringFieldUpdateOperationsInput | string
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

  export type AnuncioListRelationFilter = {
    every?: AnuncioWhereInput
    some?: AnuncioWhereInput
    none?: AnuncioWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AnuncioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    whatsapp?: SortOrder
    documento?: SortOrder
    tipDoc?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    whatsapp?: SortOrder
    documento?: SortOrder
    tipDoc?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    whatsapp?: SortOrder
    documento?: SortOrder
    tipDoc?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FotoListRelationFilter = {
    every?: FotoWhereInput
    some?: FotoWhereInput
    none?: FotoWhereInput
  }

  export type FotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnuncioCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    modelo?: SortOrder
    versao?: SortOrder
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    combustivel?: SortOrder
    cambio?: SortOrder
    cor?: SortOrder
    portas?: SortOrder
    blindado?: SortOrder
    financiamento?: SortOrder
    troca?: SortOrder
    preco?: SortOrder
    fipe?: SortOrder
    placa?: SortOrder
    descricao?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    destaque?: SortOrder
    criadoEm?: SortOrder
    expiraEm?: SortOrder
    userId?: SortOrder
  }

  export type AnuncioAvgOrderByAggregateInput = {
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    portas?: SortOrder
    preco?: SortOrder
    fipe?: SortOrder
  }

  export type AnuncioMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    modelo?: SortOrder
    versao?: SortOrder
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    combustivel?: SortOrder
    cambio?: SortOrder
    cor?: SortOrder
    portas?: SortOrder
    blindado?: SortOrder
    financiamento?: SortOrder
    troca?: SortOrder
    preco?: SortOrder
    fipe?: SortOrder
    placa?: SortOrder
    descricao?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    destaque?: SortOrder
    criadoEm?: SortOrder
    expiraEm?: SortOrder
    userId?: SortOrder
  }

  export type AnuncioMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    modelo?: SortOrder
    versao?: SortOrder
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    combustivel?: SortOrder
    cambio?: SortOrder
    cor?: SortOrder
    portas?: SortOrder
    blindado?: SortOrder
    financiamento?: SortOrder
    troca?: SortOrder
    preco?: SortOrder
    fipe?: SortOrder
    placa?: SortOrder
    descricao?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    destaque?: SortOrder
    criadoEm?: SortOrder
    expiraEm?: SortOrder
    userId?: SortOrder
  }

  export type AnuncioSumOrderByAggregateInput = {
    anoFab?: SortOrder
    anoMod?: SortOrder
    km?: SortOrder
    portas?: SortOrder
    preco?: SortOrder
    fipe?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AnuncioScalarRelationFilter = {
    is?: AnuncioWhereInput
    isNot?: AnuncioWhereInput
  }

  export type FotoCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    capa?: SortOrder
    anuncioId?: SortOrder
  }

  export type FotoMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    capa?: SortOrder
    anuncioId?: SortOrder
  }

  export type FotoMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    capa?: SortOrder
    anuncioId?: SortOrder
  }

  export type AnuncioCreateNestedManyWithoutUserInput = {
    create?: XOR<AnuncioCreateWithoutUserInput, AnuncioUncheckedCreateWithoutUserInput> | AnuncioCreateWithoutUserInput[] | AnuncioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnuncioCreateOrConnectWithoutUserInput | AnuncioCreateOrConnectWithoutUserInput[]
    createMany?: AnuncioCreateManyUserInputEnvelope
    connect?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
  }

  export type AnuncioUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AnuncioCreateWithoutUserInput, AnuncioUncheckedCreateWithoutUserInput> | AnuncioCreateWithoutUserInput[] | AnuncioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnuncioCreateOrConnectWithoutUserInput | AnuncioCreateOrConnectWithoutUserInput[]
    createMany?: AnuncioCreateManyUserInputEnvelope
    connect?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AnuncioUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnuncioCreateWithoutUserInput, AnuncioUncheckedCreateWithoutUserInput> | AnuncioCreateWithoutUserInput[] | AnuncioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnuncioCreateOrConnectWithoutUserInput | AnuncioCreateOrConnectWithoutUserInput[]
    upsert?: AnuncioUpsertWithWhereUniqueWithoutUserInput | AnuncioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnuncioCreateManyUserInputEnvelope
    set?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    disconnect?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    delete?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    connect?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    update?: AnuncioUpdateWithWhereUniqueWithoutUserInput | AnuncioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnuncioUpdateManyWithWhereWithoutUserInput | AnuncioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnuncioScalarWhereInput | AnuncioScalarWhereInput[]
  }

  export type AnuncioUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnuncioCreateWithoutUserInput, AnuncioUncheckedCreateWithoutUserInput> | AnuncioCreateWithoutUserInput[] | AnuncioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnuncioCreateOrConnectWithoutUserInput | AnuncioCreateOrConnectWithoutUserInput[]
    upsert?: AnuncioUpsertWithWhereUniqueWithoutUserInput | AnuncioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnuncioCreateManyUserInputEnvelope
    set?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    disconnect?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    delete?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    connect?: AnuncioWhereUniqueInput | AnuncioWhereUniqueInput[]
    update?: AnuncioUpdateWithWhereUniqueWithoutUserInput | AnuncioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnuncioUpdateManyWithWhereWithoutUserInput | AnuncioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnuncioScalarWhereInput | AnuncioScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAnunciosInput = {
    create?: XOR<UserCreateWithoutAnunciosInput, UserUncheckedCreateWithoutAnunciosInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnunciosInput
    connect?: UserWhereUniqueInput
  }

  export type FotoCreateNestedManyWithoutAnuncioInput = {
    create?: XOR<FotoCreateWithoutAnuncioInput, FotoUncheckedCreateWithoutAnuncioInput> | FotoCreateWithoutAnuncioInput[] | FotoUncheckedCreateWithoutAnuncioInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutAnuncioInput | FotoCreateOrConnectWithoutAnuncioInput[]
    createMany?: FotoCreateManyAnuncioInputEnvelope
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
  }

  export type FotoUncheckedCreateNestedManyWithoutAnuncioInput = {
    create?: XOR<FotoCreateWithoutAnuncioInput, FotoUncheckedCreateWithoutAnuncioInput> | FotoCreateWithoutAnuncioInput[] | FotoUncheckedCreateWithoutAnuncioInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutAnuncioInput | FotoCreateOrConnectWithoutAnuncioInput[]
    createMany?: FotoCreateManyAnuncioInputEnvelope
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAnunciosNestedInput = {
    create?: XOR<UserCreateWithoutAnunciosInput, UserUncheckedCreateWithoutAnunciosInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnunciosInput
    upsert?: UserUpsertWithoutAnunciosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnunciosInput, UserUpdateWithoutAnunciosInput>, UserUncheckedUpdateWithoutAnunciosInput>
  }

  export type FotoUpdateManyWithoutAnuncioNestedInput = {
    create?: XOR<FotoCreateWithoutAnuncioInput, FotoUncheckedCreateWithoutAnuncioInput> | FotoCreateWithoutAnuncioInput[] | FotoUncheckedCreateWithoutAnuncioInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutAnuncioInput | FotoCreateOrConnectWithoutAnuncioInput[]
    upsert?: FotoUpsertWithWhereUniqueWithoutAnuncioInput | FotoUpsertWithWhereUniqueWithoutAnuncioInput[]
    createMany?: FotoCreateManyAnuncioInputEnvelope
    set?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    disconnect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    delete?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    update?: FotoUpdateWithWhereUniqueWithoutAnuncioInput | FotoUpdateWithWhereUniqueWithoutAnuncioInput[]
    updateMany?: FotoUpdateManyWithWhereWithoutAnuncioInput | FotoUpdateManyWithWhereWithoutAnuncioInput[]
    deleteMany?: FotoScalarWhereInput | FotoScalarWhereInput[]
  }

  export type FotoUncheckedUpdateManyWithoutAnuncioNestedInput = {
    create?: XOR<FotoCreateWithoutAnuncioInput, FotoUncheckedCreateWithoutAnuncioInput> | FotoCreateWithoutAnuncioInput[] | FotoUncheckedCreateWithoutAnuncioInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutAnuncioInput | FotoCreateOrConnectWithoutAnuncioInput[]
    upsert?: FotoUpsertWithWhereUniqueWithoutAnuncioInput | FotoUpsertWithWhereUniqueWithoutAnuncioInput[]
    createMany?: FotoCreateManyAnuncioInputEnvelope
    set?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    disconnect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    delete?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    update?: FotoUpdateWithWhereUniqueWithoutAnuncioInput | FotoUpdateWithWhereUniqueWithoutAnuncioInput[]
    updateMany?: FotoUpdateManyWithWhereWithoutAnuncioInput | FotoUpdateManyWithWhereWithoutAnuncioInput[]
    deleteMany?: FotoScalarWhereInput | FotoScalarWhereInput[]
  }

  export type AnuncioCreateNestedOneWithoutFotosInput = {
    create?: XOR<AnuncioCreateWithoutFotosInput, AnuncioUncheckedCreateWithoutFotosInput>
    connectOrCreate?: AnuncioCreateOrConnectWithoutFotosInput
    connect?: AnuncioWhereUniqueInput
  }

  export type AnuncioUpdateOneRequiredWithoutFotosNestedInput = {
    create?: XOR<AnuncioCreateWithoutFotosInput, AnuncioUncheckedCreateWithoutFotosInput>
    connectOrCreate?: AnuncioCreateOrConnectWithoutFotosInput
    upsert?: AnuncioUpsertWithoutFotosInput
    connect?: AnuncioWhereUniqueInput
    update?: XOR<XOR<AnuncioUpdateToOneWithWhereWithoutFotosInput, AnuncioUpdateWithoutFotosInput>, AnuncioUncheckedUpdateWithoutFotosInput>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AnuncioCreateWithoutUserInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    fotos?: FotoCreateNestedManyWithoutAnuncioInput
  }

  export type AnuncioUncheckedCreateWithoutUserInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    fotos?: FotoUncheckedCreateNestedManyWithoutAnuncioInput
  }

  export type AnuncioCreateOrConnectWithoutUserInput = {
    where: AnuncioWhereUniqueInput
    create: XOR<AnuncioCreateWithoutUserInput, AnuncioUncheckedCreateWithoutUserInput>
  }

  export type AnuncioCreateManyUserInputEnvelope = {
    data: AnuncioCreateManyUserInput | AnuncioCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AnuncioUpsertWithWhereUniqueWithoutUserInput = {
    where: AnuncioWhereUniqueInput
    update: XOR<AnuncioUpdateWithoutUserInput, AnuncioUncheckedUpdateWithoutUserInput>
    create: XOR<AnuncioCreateWithoutUserInput, AnuncioUncheckedCreateWithoutUserInput>
  }

  export type AnuncioUpdateWithWhereUniqueWithoutUserInput = {
    where: AnuncioWhereUniqueInput
    data: XOR<AnuncioUpdateWithoutUserInput, AnuncioUncheckedUpdateWithoutUserInput>
  }

  export type AnuncioUpdateManyWithWhereWithoutUserInput = {
    where: AnuncioScalarWhereInput
    data: XOR<AnuncioUpdateManyMutationInput, AnuncioUncheckedUpdateManyWithoutUserInput>
  }

  export type AnuncioScalarWhereInput = {
    AND?: AnuncioScalarWhereInput | AnuncioScalarWhereInput[]
    OR?: AnuncioScalarWhereInput[]
    NOT?: AnuncioScalarWhereInput | AnuncioScalarWhereInput[]
    id?: StringFilter<"Anuncio"> | string
    titulo?: StringFilter<"Anuncio"> | string
    categoria?: StringFilter<"Anuncio"> | string
    marca?: StringFilter<"Anuncio"> | string
    modelo?: StringFilter<"Anuncio"> | string
    versao?: StringNullableFilter<"Anuncio"> | string | null
    anoFab?: IntFilter<"Anuncio"> | number
    anoMod?: IntFilter<"Anuncio"> | number
    km?: IntFilter<"Anuncio"> | number
    combustivel?: StringFilter<"Anuncio"> | string
    cambio?: StringFilter<"Anuncio"> | string
    cor?: StringFilter<"Anuncio"> | string
    portas?: IntNullableFilter<"Anuncio"> | number | null
    blindado?: BoolFilter<"Anuncio"> | boolean
    financiamento?: BoolFilter<"Anuncio"> | boolean
    troca?: BoolFilter<"Anuncio"> | boolean
    preco?: FloatFilter<"Anuncio"> | number
    fipe?: FloatNullableFilter<"Anuncio"> | number | null
    placa?: StringNullableFilter<"Anuncio"> | string | null
    descricao?: StringNullableFilter<"Anuncio"> | string | null
    plano?: StringFilter<"Anuncio"> | string
    ativo?: BoolFilter<"Anuncio"> | boolean
    destaque?: BoolFilter<"Anuncio"> | boolean
    criadoEm?: DateTimeFilter<"Anuncio"> | Date | string
    expiraEm?: DateTimeNullableFilter<"Anuncio"> | Date | string | null
    userId?: StringFilter<"Anuncio"> | string
  }

  export type UserCreateWithoutAnunciosInput = {
    id?: string
    nome: string
    email: string
    senha: string
    whatsapp?: string | null
    documento: string
    tipDoc?: string
    cidade?: string | null
    estado?: string | null
    plano?: string
    ativo?: boolean
    criadoEm?: Date | string
  }

  export type UserUncheckedCreateWithoutAnunciosInput = {
    id?: string
    nome: string
    email: string
    senha: string
    whatsapp?: string | null
    documento: string
    tipDoc?: string
    cidade?: string | null
    estado?: string | null
    plano?: string
    ativo?: boolean
    criadoEm?: Date | string
  }

  export type UserCreateOrConnectWithoutAnunciosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnunciosInput, UserUncheckedCreateWithoutAnunciosInput>
  }

  export type FotoCreateWithoutAnuncioInput = {
    id?: string
    url: string
    capa?: boolean
  }

  export type FotoUncheckedCreateWithoutAnuncioInput = {
    id?: string
    url: string
    capa?: boolean
  }

  export type FotoCreateOrConnectWithoutAnuncioInput = {
    where: FotoWhereUniqueInput
    create: XOR<FotoCreateWithoutAnuncioInput, FotoUncheckedCreateWithoutAnuncioInput>
  }

  export type FotoCreateManyAnuncioInputEnvelope = {
    data: FotoCreateManyAnuncioInput | FotoCreateManyAnuncioInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAnunciosInput = {
    update: XOR<UserUpdateWithoutAnunciosInput, UserUncheckedUpdateWithoutAnunciosInput>
    create: XOR<UserCreateWithoutAnunciosInput, UserUncheckedCreateWithoutAnunciosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnunciosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnunciosInput, UserUncheckedUpdateWithoutAnunciosInput>
  }

  export type UserUpdateWithoutAnunciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: StringFieldUpdateOperationsInput | string
    tipDoc?: StringFieldUpdateOperationsInput | string
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAnunciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: StringFieldUpdateOperationsInput | string
    tipDoc?: StringFieldUpdateOperationsInput | string
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FotoUpsertWithWhereUniqueWithoutAnuncioInput = {
    where: FotoWhereUniqueInput
    update: XOR<FotoUpdateWithoutAnuncioInput, FotoUncheckedUpdateWithoutAnuncioInput>
    create: XOR<FotoCreateWithoutAnuncioInput, FotoUncheckedCreateWithoutAnuncioInput>
  }

  export type FotoUpdateWithWhereUniqueWithoutAnuncioInput = {
    where: FotoWhereUniqueInput
    data: XOR<FotoUpdateWithoutAnuncioInput, FotoUncheckedUpdateWithoutAnuncioInput>
  }

  export type FotoUpdateManyWithWhereWithoutAnuncioInput = {
    where: FotoScalarWhereInput
    data: XOR<FotoUpdateManyMutationInput, FotoUncheckedUpdateManyWithoutAnuncioInput>
  }

  export type FotoScalarWhereInput = {
    AND?: FotoScalarWhereInput | FotoScalarWhereInput[]
    OR?: FotoScalarWhereInput[]
    NOT?: FotoScalarWhereInput | FotoScalarWhereInput[]
    id?: StringFilter<"Foto"> | string
    url?: StringFilter<"Foto"> | string
    capa?: BoolFilter<"Foto"> | boolean
    anuncioId?: StringFilter<"Foto"> | string
  }

  export type AnuncioCreateWithoutFotosInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    user: UserCreateNestedOneWithoutAnunciosInput
  }

  export type AnuncioUncheckedCreateWithoutFotosInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
    userId: string
  }

  export type AnuncioCreateOrConnectWithoutFotosInput = {
    where: AnuncioWhereUniqueInput
    create: XOR<AnuncioCreateWithoutFotosInput, AnuncioUncheckedCreateWithoutFotosInput>
  }

  export type AnuncioUpsertWithoutFotosInput = {
    update: XOR<AnuncioUpdateWithoutFotosInput, AnuncioUncheckedUpdateWithoutFotosInput>
    create: XOR<AnuncioCreateWithoutFotosInput, AnuncioUncheckedCreateWithoutFotosInput>
    where?: AnuncioWhereInput
  }

  export type AnuncioUpdateToOneWithWhereWithoutFotosInput = {
    where?: AnuncioWhereInput
    data: XOR<AnuncioUpdateWithoutFotosInput, AnuncioUncheckedUpdateWithoutFotosInput>
  }

  export type AnuncioUpdateWithoutFotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAnunciosNestedInput
  }

  export type AnuncioUncheckedUpdateWithoutFotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AnuncioCreateManyUserInput = {
    id?: string
    titulo: string
    categoria: string
    marca: string
    modelo: string
    versao?: string | null
    anoFab: number
    anoMod: number
    km: number
    combustivel: string
    cambio: string
    cor: string
    portas?: number | null
    blindado?: boolean
    financiamento?: boolean
    troca?: boolean
    preco: number
    fipe?: number | null
    placa?: string | null
    descricao?: string | null
    plano?: string
    ativo?: boolean
    destaque?: boolean
    criadoEm?: Date | string
    expiraEm?: Date | string | null
  }

  export type AnuncioUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fotos?: FotoUpdateManyWithoutAnuncioNestedInput
  }

  export type AnuncioUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fotos?: FotoUncheckedUpdateManyWithoutAnuncioNestedInput
  }

  export type AnuncioUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    versao?: NullableStringFieldUpdateOperationsInput | string | null
    anoFab?: IntFieldUpdateOperationsInput | number
    anoMod?: IntFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    combustivel?: StringFieldUpdateOperationsInput | string
    cambio?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    portas?: NullableIntFieldUpdateOperationsInput | number | null
    blindado?: BoolFieldUpdateOperationsInput | boolean
    financiamento?: BoolFieldUpdateOperationsInput | boolean
    troca?: BoolFieldUpdateOperationsInput | boolean
    preco?: FloatFieldUpdateOperationsInput | number
    fipe?: NullableFloatFieldUpdateOperationsInput | number | null
    placa?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    destaque?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    expiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FotoCreateManyAnuncioInput = {
    id?: string
    url: string
    capa?: boolean
  }

  export type FotoUpdateWithoutAnuncioInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FotoUncheckedUpdateWithoutAnuncioInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FotoUncheckedUpdateManyWithoutAnuncioInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    capa?: BoolFieldUpdateOperationsInput | boolean
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