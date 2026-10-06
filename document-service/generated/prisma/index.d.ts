
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
 * Model Template
 * 
 */
export type Template = $Result.DefaultSelection<Prisma.$TemplatePayload>
/**
 * Model TemplateField
 * 
 */
export type TemplateField = $Result.DefaultSelection<Prisma.$TemplateFieldPayload>
/**
 * Model GeneratedDocument
 * 
 */
export type GeneratedDocument = $Result.DefaultSelection<Prisma.$GeneratedDocumentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Templates
 * const templates = await prisma.template.findMany()
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
   * // Fetch zero or more Templates
   * const templates = await prisma.template.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templateField`: Exposes CRUD operations for the **TemplateField** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplateFields
    * const templateFields = await prisma.templateField.findMany()
    * ```
    */
  get templateField(): Prisma.TemplateFieldDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.generatedDocument`: Exposes CRUD operations for the **GeneratedDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneratedDocuments
    * const generatedDocuments = await prisma.generatedDocument.findMany()
    * ```
    */
  get generatedDocument(): Prisma.GeneratedDocumentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
    Template: 'Template',
    TemplateField: 'TemplateField',
    GeneratedDocument: 'GeneratedDocument'
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
      modelProps: "template" | "templateField" | "generatedDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Template: {
        payload: Prisma.$TemplatePayload<ExtArgs>
        fields: Prisma.TemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findFirst: {
            args: Prisma.TemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findMany: {
            args: Prisma.TemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          create: {
            args: Prisma.TemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          createMany: {
            args: Prisma.TemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          update: {
            args: Prisma.TemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          deleteMany: {
            args: Prisma.TemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.TemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      TemplateField: {
        payload: Prisma.$TemplateFieldPayload<ExtArgs>
        fields: Prisma.TemplateFieldFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFieldFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFieldFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>
          }
          findFirst: {
            args: Prisma.TemplateFieldFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFieldFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>
          }
          findMany: {
            args: Prisma.TemplateFieldFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>[]
          }
          create: {
            args: Prisma.TemplateFieldCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>
          }
          createMany: {
            args: Prisma.TemplateFieldCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TemplateFieldDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>
          }
          update: {
            args: Prisma.TemplateFieldUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>
          }
          deleteMany: {
            args: Prisma.TemplateFieldDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateFieldUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TemplateFieldUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateFieldPayload>
          }
          aggregate: {
            args: Prisma.TemplateFieldAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplateField>
          }
          groupBy: {
            args: Prisma.TemplateFieldGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateFieldGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateFieldCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateFieldCountAggregateOutputType> | number
          }
        }
      }
      GeneratedDocument: {
        payload: Prisma.$GeneratedDocumentPayload<ExtArgs>
        fields: Prisma.GeneratedDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneratedDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneratedDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>
          }
          findFirst: {
            args: Prisma.GeneratedDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneratedDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>
          }
          findMany: {
            args: Prisma.GeneratedDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>[]
          }
          create: {
            args: Prisma.GeneratedDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>
          }
          createMany: {
            args: Prisma.GeneratedDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GeneratedDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>
          }
          update: {
            args: Prisma.GeneratedDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>
          }
          deleteMany: {
            args: Prisma.GeneratedDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneratedDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GeneratedDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedDocumentPayload>
          }
          aggregate: {
            args: Prisma.GeneratedDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneratedDocument>
          }
          groupBy: {
            args: Prisma.GeneratedDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneratedDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneratedDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<GeneratedDocumentCountAggregateOutputType> | number
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
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
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
    template?: TemplateOmit
    templateField?: TemplateFieldOmit
    generatedDocument?: GeneratedDocumentOmit
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
   * Count Type TemplateCountOutputType
   */

  export type TemplateCountOutputType = {
    fields: number
    documents: number
  }

  export type TemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fields?: boolean | TemplateCountOutputTypeCountFieldsArgs
    documents?: boolean | TemplateCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateCountOutputType
     */
    select?: TemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeCountFieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateFieldWhereInput
  }

  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedDocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateAvgAggregateOutputType = {
    id: number | null
  }

  export type TemplateSumAggregateOutputType = {
    id: number | null
  }

  export type TemplateMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    filePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    filePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    name: number
    description: number
    filePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplateAvgAggregateInputType = {
    id?: true
  }

  export type TemplateSumAggregateInputType = {
    id?: true
  }

  export type TemplateMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    filePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    filePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    filePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithAggregationInput | TemplateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _avg?: TemplateAvgAggregateInputType
    _sum?: TemplateSumAggregateInputType
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: number
    name: string
    description: string | null
    filePath: string
    createdAt: Date
    updatedAt: Date
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    filePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fields?: boolean | Template$fieldsArgs<ExtArgs>
    documents?: boolean | Template$documentsArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>



  export type TemplateSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    filePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "filePath" | "createdAt" | "updatedAt", ExtArgs["result"]["template"]>
  export type TemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fields?: boolean | Template$fieldsArgs<ExtArgs>
    documents?: boolean | Template$documentsArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Template"
    objects: {
      fields: Prisma.$TemplateFieldPayload<ExtArgs>[]
      documents: Prisma.$GeneratedDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      filePath: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type TemplateGetPayload<S extends boolean | null | undefined | TemplateDefaultArgs> = $Result.GetResult<Prisma.$TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFindUniqueArgs>(args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFindFirstArgs>(args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFindManyArgs>(args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends TemplateCreateArgs>(args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateCreateManyArgs>(args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends TemplateDeleteArgs>(args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateUpdateArgs>(args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateDeleteManyArgs>(args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateUpdateManyArgs>(args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends TemplateUpsertArgs>(args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
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
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Template model
   */
  readonly fields: TemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fields<T extends Template$fieldsArgs<ExtArgs> = {}>(args?: Subset<T, Template$fieldsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Template$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Template$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Template model
   */
  interface TemplateFieldRefs {
    readonly id: FieldRef<"Template", 'Int'>
    readonly name: FieldRef<"Template", 'String'>
    readonly description: FieldRef<"Template", 'String'>
    readonly filePath: FieldRef<"Template", 'String'>
    readonly createdAt: FieldRef<"Template", 'DateTime'>
    readonly updatedAt: FieldRef<"Template", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Template findUnique
   */
  export type TemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findFirst
   */
  export type TemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }

  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }

  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to delete.
     */
    limit?: number
  }

  /**
   * Template.fields
   */
  export type Template$fieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    where?: TemplateFieldWhereInput
    orderBy?: TemplateFieldOrderByWithRelationInput | TemplateFieldOrderByWithRelationInput[]
    cursor?: TemplateFieldWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateFieldScalarFieldEnum | TemplateFieldScalarFieldEnum[]
  }

  /**
   * Template.documents
   */
  export type Template$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    where?: GeneratedDocumentWhereInput
    orderBy?: GeneratedDocumentOrderByWithRelationInput | GeneratedDocumentOrderByWithRelationInput[]
    cursor?: GeneratedDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GeneratedDocumentScalarFieldEnum | GeneratedDocumentScalarFieldEnum[]
  }

  /**
   * Template without action
   */
  export type TemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
  }


  /**
   * Model TemplateField
   */

  export type AggregateTemplateField = {
    _count: TemplateFieldCountAggregateOutputType | null
    _avg: TemplateFieldAvgAggregateOutputType | null
    _sum: TemplateFieldSumAggregateOutputType | null
    _min: TemplateFieldMinAggregateOutputType | null
    _max: TemplateFieldMaxAggregateOutputType | null
  }

  export type TemplateFieldAvgAggregateOutputType = {
    id: number | null
    templateId: number | null
  }

  export type TemplateFieldSumAggregateOutputType = {
    id: number | null
    templateId: number | null
  }

  export type TemplateFieldMinAggregateOutputType = {
    id: number | null
    templateId: number | null
    name: string | null
    label: string | null
    type: string | null
    required: boolean | null
  }

  export type TemplateFieldMaxAggregateOutputType = {
    id: number | null
    templateId: number | null
    name: string | null
    label: string | null
    type: string | null
    required: boolean | null
  }

  export type TemplateFieldCountAggregateOutputType = {
    id: number
    templateId: number
    name: number
    label: number
    type: number
    required: number
    _all: number
  }


  export type TemplateFieldAvgAggregateInputType = {
    id?: true
    templateId?: true
  }

  export type TemplateFieldSumAggregateInputType = {
    id?: true
    templateId?: true
  }

  export type TemplateFieldMinAggregateInputType = {
    id?: true
    templateId?: true
    name?: true
    label?: true
    type?: true
    required?: true
  }

  export type TemplateFieldMaxAggregateInputType = {
    id?: true
    templateId?: true
    name?: true
    label?: true
    type?: true
    required?: true
  }

  export type TemplateFieldCountAggregateInputType = {
    id?: true
    templateId?: true
    name?: true
    label?: true
    type?: true
    required?: true
    _all?: true
  }

  export type TemplateFieldAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateField to aggregate.
     */
    where?: TemplateFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateFields to fetch.
     */
    orderBy?: TemplateFieldOrderByWithRelationInput | TemplateFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplateFields
    **/
    _count?: true | TemplateFieldCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateFieldAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateFieldSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateFieldMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateFieldMaxAggregateInputType
  }

  export type GetTemplateFieldAggregateType<T extends TemplateFieldAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplateField]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplateField[P]>
      : GetScalarType<T[P], AggregateTemplateField[P]>
  }




  export type TemplateFieldGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateFieldWhereInput
    orderBy?: TemplateFieldOrderByWithAggregationInput | TemplateFieldOrderByWithAggregationInput[]
    by: TemplateFieldScalarFieldEnum[] | TemplateFieldScalarFieldEnum
    having?: TemplateFieldScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateFieldCountAggregateInputType | true
    _avg?: TemplateFieldAvgAggregateInputType
    _sum?: TemplateFieldSumAggregateInputType
    _min?: TemplateFieldMinAggregateInputType
    _max?: TemplateFieldMaxAggregateInputType
  }

  export type TemplateFieldGroupByOutputType = {
    id: number
    templateId: number
    name: string
    label: string
    type: string
    required: boolean
    _count: TemplateFieldCountAggregateOutputType | null
    _avg: TemplateFieldAvgAggregateOutputType | null
    _sum: TemplateFieldSumAggregateOutputType | null
    _min: TemplateFieldMinAggregateOutputType | null
    _max: TemplateFieldMaxAggregateOutputType | null
  }

  type GetTemplateFieldGroupByPayload<T extends TemplateFieldGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateFieldGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateFieldGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateFieldGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateFieldGroupByOutputType[P]>
        }
      >
    >


  export type TemplateFieldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    name?: boolean
    label?: boolean
    type?: boolean
    required?: boolean
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateField"]>



  export type TemplateFieldSelectScalar = {
    id?: boolean
    templateId?: boolean
    name?: boolean
    label?: boolean
    type?: boolean
    required?: boolean
  }

  export type TemplateFieldOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "templateId" | "name" | "label" | "type" | "required", ExtArgs["result"]["templateField"]>
  export type TemplateFieldInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }

  export type $TemplateFieldPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplateField"
    objects: {
      template: Prisma.$TemplatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      templateId: number
      name: string
      label: string
      type: string
      required: boolean
    }, ExtArgs["result"]["templateField"]>
    composites: {}
  }

  type TemplateFieldGetPayload<S extends boolean | null | undefined | TemplateFieldDefaultArgs> = $Result.GetResult<Prisma.$TemplateFieldPayload, S>

  type TemplateFieldCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateFieldFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateFieldCountAggregateInputType | true
    }

  export interface TemplateFieldDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplateField'], meta: { name: 'TemplateField' } }
    /**
     * Find zero or one TemplateField that matches the filter.
     * @param {TemplateFieldFindUniqueArgs} args - Arguments to find a TemplateField
     * @example
     * // Get one TemplateField
     * const templateField = await prisma.templateField.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFieldFindUniqueArgs>(args: SelectSubset<T, TemplateFieldFindUniqueArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplateField that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateFieldFindUniqueOrThrowArgs} args - Arguments to find a TemplateField
     * @example
     * // Get one TemplateField
     * const templateField = await prisma.templateField.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFieldFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFieldFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateField that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldFindFirstArgs} args - Arguments to find a TemplateField
     * @example
     * // Get one TemplateField
     * const templateField = await prisma.templateField.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFieldFindFirstArgs>(args?: SelectSubset<T, TemplateFieldFindFirstArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateField that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldFindFirstOrThrowArgs} args - Arguments to find a TemplateField
     * @example
     * // Get one TemplateField
     * const templateField = await prisma.templateField.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFieldFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFieldFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplateFields that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplateFields
     * const templateFields = await prisma.templateField.findMany()
     * 
     * // Get first 10 TemplateFields
     * const templateFields = await prisma.templateField.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateFieldWithIdOnly = await prisma.templateField.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFieldFindManyArgs>(args?: SelectSubset<T, TemplateFieldFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplateField.
     * @param {TemplateFieldCreateArgs} args - Arguments to create a TemplateField.
     * @example
     * // Create one TemplateField
     * const TemplateField = await prisma.templateField.create({
     *   data: {
     *     // ... data to create a TemplateField
     *   }
     * })
     * 
     */
    create<T extends TemplateFieldCreateArgs>(args: SelectSubset<T, TemplateFieldCreateArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplateFields.
     * @param {TemplateFieldCreateManyArgs} args - Arguments to create many TemplateFields.
     * @example
     * // Create many TemplateFields
     * const templateField = await prisma.templateField.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateFieldCreateManyArgs>(args?: SelectSubset<T, TemplateFieldCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TemplateField.
     * @param {TemplateFieldDeleteArgs} args - Arguments to delete one TemplateField.
     * @example
     * // Delete one TemplateField
     * const TemplateField = await prisma.templateField.delete({
     *   where: {
     *     // ... filter to delete one TemplateField
     *   }
     * })
     * 
     */
    delete<T extends TemplateFieldDeleteArgs>(args: SelectSubset<T, TemplateFieldDeleteArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplateField.
     * @param {TemplateFieldUpdateArgs} args - Arguments to update one TemplateField.
     * @example
     * // Update one TemplateField
     * const templateField = await prisma.templateField.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateFieldUpdateArgs>(args: SelectSubset<T, TemplateFieldUpdateArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplateFields.
     * @param {TemplateFieldDeleteManyArgs} args - Arguments to filter TemplateFields to delete.
     * @example
     * // Delete a few TemplateFields
     * const { count } = await prisma.templateField.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateFieldDeleteManyArgs>(args?: SelectSubset<T, TemplateFieldDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplateFields
     * const templateField = await prisma.templateField.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateFieldUpdateManyArgs>(args: SelectSubset<T, TemplateFieldUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TemplateField.
     * @param {TemplateFieldUpsertArgs} args - Arguments to update or create a TemplateField.
     * @example
     * // Update or create a TemplateField
     * const templateField = await prisma.templateField.upsert({
     *   create: {
     *     // ... data to create a TemplateField
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplateField we want to update
     *   }
     * })
     */
    upsert<T extends TemplateFieldUpsertArgs>(args: SelectSubset<T, TemplateFieldUpsertArgs<ExtArgs>>): Prisma__TemplateFieldClient<$Result.GetResult<Prisma.$TemplateFieldPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplateFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldCountArgs} args - Arguments to filter TemplateFields to count.
     * @example
     * // Count the number of TemplateFields
     * const count = await prisma.templateField.count({
     *   where: {
     *     // ... the filter for the TemplateFields we want to count
     *   }
     * })
    **/
    count<T extends TemplateFieldCountArgs>(
      args?: Subset<T, TemplateFieldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateFieldCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplateField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TemplateFieldAggregateArgs>(args: Subset<T, TemplateFieldAggregateArgs>): Prisma.PrismaPromise<GetTemplateFieldAggregateType<T>>

    /**
     * Group by TemplateField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFieldGroupByArgs} args - Group by arguments.
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
      T extends TemplateFieldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateFieldGroupByArgs['orderBy'] }
        : { orderBy?: TemplateFieldGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TemplateFieldGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateFieldGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplateField model
   */
  readonly fields: TemplateFieldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplateField.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateFieldClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends TemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TemplateDefaultArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TemplateField model
   */
  interface TemplateFieldFieldRefs {
    readonly id: FieldRef<"TemplateField", 'Int'>
    readonly templateId: FieldRef<"TemplateField", 'Int'>
    readonly name: FieldRef<"TemplateField", 'String'>
    readonly label: FieldRef<"TemplateField", 'String'>
    readonly type: FieldRef<"TemplateField", 'String'>
    readonly required: FieldRef<"TemplateField", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TemplateField findUnique
   */
  export type TemplateFieldFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * Filter, which TemplateField to fetch.
     */
    where: TemplateFieldWhereUniqueInput
  }

  /**
   * TemplateField findUniqueOrThrow
   */
  export type TemplateFieldFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * Filter, which TemplateField to fetch.
     */
    where: TemplateFieldWhereUniqueInput
  }

  /**
   * TemplateField findFirst
   */
  export type TemplateFieldFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * Filter, which TemplateField to fetch.
     */
    where?: TemplateFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateFields to fetch.
     */
    orderBy?: TemplateFieldOrderByWithRelationInput | TemplateFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateFields.
     */
    cursor?: TemplateFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateFields.
     */
    distinct?: TemplateFieldScalarFieldEnum | TemplateFieldScalarFieldEnum[]
  }

  /**
   * TemplateField findFirstOrThrow
   */
  export type TemplateFieldFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * Filter, which TemplateField to fetch.
     */
    where?: TemplateFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateFields to fetch.
     */
    orderBy?: TemplateFieldOrderByWithRelationInput | TemplateFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateFields.
     */
    cursor?: TemplateFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateFields.
     */
    distinct?: TemplateFieldScalarFieldEnum | TemplateFieldScalarFieldEnum[]
  }

  /**
   * TemplateField findMany
   */
  export type TemplateFieldFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * Filter, which TemplateFields to fetch.
     */
    where?: TemplateFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateFields to fetch.
     */
    orderBy?: TemplateFieldOrderByWithRelationInput | TemplateFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplateFields.
     */
    cursor?: TemplateFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateFields.
     */
    distinct?: TemplateFieldScalarFieldEnum | TemplateFieldScalarFieldEnum[]
  }

  /**
   * TemplateField create
   */
  export type TemplateFieldCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * The data needed to create a TemplateField.
     */
    data: XOR<TemplateFieldCreateInput, TemplateFieldUncheckedCreateInput>
  }

  /**
   * TemplateField createMany
   */
  export type TemplateFieldCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplateFields.
     */
    data: TemplateFieldCreateManyInput | TemplateFieldCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TemplateField update
   */
  export type TemplateFieldUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * The data needed to update a TemplateField.
     */
    data: XOR<TemplateFieldUpdateInput, TemplateFieldUncheckedUpdateInput>
    /**
     * Choose, which TemplateField to update.
     */
    where: TemplateFieldWhereUniqueInput
  }

  /**
   * TemplateField updateMany
   */
  export type TemplateFieldUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplateFields.
     */
    data: XOR<TemplateFieldUpdateManyMutationInput, TemplateFieldUncheckedUpdateManyInput>
    /**
     * Filter which TemplateFields to update
     */
    where?: TemplateFieldWhereInput
    /**
     * Limit how many TemplateFields to update.
     */
    limit?: number
  }

  /**
   * TemplateField upsert
   */
  export type TemplateFieldUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * The filter to search for the TemplateField to update in case it exists.
     */
    where: TemplateFieldWhereUniqueInput
    /**
     * In case the TemplateField found by the `where` argument doesn't exist, create a new TemplateField with this data.
     */
    create: XOR<TemplateFieldCreateInput, TemplateFieldUncheckedCreateInput>
    /**
     * In case the TemplateField was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateFieldUpdateInput, TemplateFieldUncheckedUpdateInput>
  }

  /**
   * TemplateField delete
   */
  export type TemplateFieldDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
    /**
     * Filter which TemplateField to delete.
     */
    where: TemplateFieldWhereUniqueInput
  }

  /**
   * TemplateField deleteMany
   */
  export type TemplateFieldDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateFields to delete
     */
    where?: TemplateFieldWhereInput
    /**
     * Limit how many TemplateFields to delete.
     */
    limit?: number
  }

  /**
   * TemplateField without action
   */
  export type TemplateFieldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateField
     */
    select?: TemplateFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateField
     */
    omit?: TemplateFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateFieldInclude<ExtArgs> | null
  }


  /**
   * Model GeneratedDocument
   */

  export type AggregateGeneratedDocument = {
    _count: GeneratedDocumentCountAggregateOutputType | null
    _avg: GeneratedDocumentAvgAggregateOutputType | null
    _sum: GeneratedDocumentSumAggregateOutputType | null
    _min: GeneratedDocumentMinAggregateOutputType | null
    _max: GeneratedDocumentMaxAggregateOutputType | null
  }

  export type GeneratedDocumentAvgAggregateOutputType = {
    id: number | null
    templateId: number | null
  }

  export type GeneratedDocumentSumAggregateOutputType = {
    id: number | null
    templateId: number | null
  }

  export type GeneratedDocumentMinAggregateOutputType = {
    id: number | null
    templateId: number | null
    filePath: string | null
    createdAt: Date | null
  }

  export type GeneratedDocumentMaxAggregateOutputType = {
    id: number | null
    templateId: number | null
    filePath: string | null
    createdAt: Date | null
  }

  export type GeneratedDocumentCountAggregateOutputType = {
    id: number
    templateId: number
    filePath: number
    createdAt: number
    _all: number
  }


  export type GeneratedDocumentAvgAggregateInputType = {
    id?: true
    templateId?: true
  }

  export type GeneratedDocumentSumAggregateInputType = {
    id?: true
    templateId?: true
  }

  export type GeneratedDocumentMinAggregateInputType = {
    id?: true
    templateId?: true
    filePath?: true
    createdAt?: true
  }

  export type GeneratedDocumentMaxAggregateInputType = {
    id?: true
    templateId?: true
    filePath?: true
    createdAt?: true
  }

  export type GeneratedDocumentCountAggregateInputType = {
    id?: true
    templateId?: true
    filePath?: true
    createdAt?: true
    _all?: true
  }

  export type GeneratedDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedDocument to aggregate.
     */
    where?: GeneratedDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedDocuments to fetch.
     */
    orderBy?: GeneratedDocumentOrderByWithRelationInput | GeneratedDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneratedDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneratedDocuments
    **/
    _count?: true | GeneratedDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeneratedDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeneratedDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneratedDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneratedDocumentMaxAggregateInputType
  }

  export type GetGeneratedDocumentAggregateType<T extends GeneratedDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneratedDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneratedDocument[P]>
      : GetScalarType<T[P], AggregateGeneratedDocument[P]>
  }




  export type GeneratedDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedDocumentWhereInput
    orderBy?: GeneratedDocumentOrderByWithAggregationInput | GeneratedDocumentOrderByWithAggregationInput[]
    by: GeneratedDocumentScalarFieldEnum[] | GeneratedDocumentScalarFieldEnum
    having?: GeneratedDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneratedDocumentCountAggregateInputType | true
    _avg?: GeneratedDocumentAvgAggregateInputType
    _sum?: GeneratedDocumentSumAggregateInputType
    _min?: GeneratedDocumentMinAggregateInputType
    _max?: GeneratedDocumentMaxAggregateInputType
  }

  export type GeneratedDocumentGroupByOutputType = {
    id: number
    templateId: number
    filePath: string
    createdAt: Date
    _count: GeneratedDocumentCountAggregateOutputType | null
    _avg: GeneratedDocumentAvgAggregateOutputType | null
    _sum: GeneratedDocumentSumAggregateOutputType | null
    _min: GeneratedDocumentMinAggregateOutputType | null
    _max: GeneratedDocumentMaxAggregateOutputType | null
  }

  type GetGeneratedDocumentGroupByPayload<T extends GeneratedDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneratedDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneratedDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneratedDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], GeneratedDocumentGroupByOutputType[P]>
        }
      >
    >


  export type GeneratedDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    filePath?: boolean
    createdAt?: boolean
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedDocument"]>



  export type GeneratedDocumentSelectScalar = {
    id?: boolean
    templateId?: boolean
    filePath?: boolean
    createdAt?: boolean
  }

  export type GeneratedDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "templateId" | "filePath" | "createdAt", ExtArgs["result"]["generatedDocument"]>
  export type GeneratedDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }

  export type $GeneratedDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneratedDocument"
    objects: {
      template: Prisma.$TemplatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      templateId: number
      filePath: string
      createdAt: Date
    }, ExtArgs["result"]["generatedDocument"]>
    composites: {}
  }

  type GeneratedDocumentGetPayload<S extends boolean | null | undefined | GeneratedDocumentDefaultArgs> = $Result.GetResult<Prisma.$GeneratedDocumentPayload, S>

  type GeneratedDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneratedDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneratedDocumentCountAggregateInputType | true
    }

  export interface GeneratedDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneratedDocument'], meta: { name: 'GeneratedDocument' } }
    /**
     * Find zero or one GeneratedDocument that matches the filter.
     * @param {GeneratedDocumentFindUniqueArgs} args - Arguments to find a GeneratedDocument
     * @example
     * // Get one GeneratedDocument
     * const generatedDocument = await prisma.generatedDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneratedDocumentFindUniqueArgs>(args: SelectSubset<T, GeneratedDocumentFindUniqueArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneratedDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneratedDocumentFindUniqueOrThrowArgs} args - Arguments to find a GeneratedDocument
     * @example
     * // Get one GeneratedDocument
     * const generatedDocument = await prisma.generatedDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneratedDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneratedDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentFindFirstArgs} args - Arguments to find a GeneratedDocument
     * @example
     * // Get one GeneratedDocument
     * const generatedDocument = await prisma.generatedDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneratedDocumentFindFirstArgs>(args?: SelectSubset<T, GeneratedDocumentFindFirstArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentFindFirstOrThrowArgs} args - Arguments to find a GeneratedDocument
     * @example
     * // Get one GeneratedDocument
     * const generatedDocument = await prisma.generatedDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneratedDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneratedDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneratedDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneratedDocuments
     * const generatedDocuments = await prisma.generatedDocument.findMany()
     * 
     * // Get first 10 GeneratedDocuments
     * const generatedDocuments = await prisma.generatedDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generatedDocumentWithIdOnly = await prisma.generatedDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneratedDocumentFindManyArgs>(args?: SelectSubset<T, GeneratedDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneratedDocument.
     * @param {GeneratedDocumentCreateArgs} args - Arguments to create a GeneratedDocument.
     * @example
     * // Create one GeneratedDocument
     * const GeneratedDocument = await prisma.generatedDocument.create({
     *   data: {
     *     // ... data to create a GeneratedDocument
     *   }
     * })
     * 
     */
    create<T extends GeneratedDocumentCreateArgs>(args: SelectSubset<T, GeneratedDocumentCreateArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneratedDocuments.
     * @param {GeneratedDocumentCreateManyArgs} args - Arguments to create many GeneratedDocuments.
     * @example
     * // Create many GeneratedDocuments
     * const generatedDocument = await prisma.generatedDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneratedDocumentCreateManyArgs>(args?: SelectSubset<T, GeneratedDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GeneratedDocument.
     * @param {GeneratedDocumentDeleteArgs} args - Arguments to delete one GeneratedDocument.
     * @example
     * // Delete one GeneratedDocument
     * const GeneratedDocument = await prisma.generatedDocument.delete({
     *   where: {
     *     // ... filter to delete one GeneratedDocument
     *   }
     * })
     * 
     */
    delete<T extends GeneratedDocumentDeleteArgs>(args: SelectSubset<T, GeneratedDocumentDeleteArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneratedDocument.
     * @param {GeneratedDocumentUpdateArgs} args - Arguments to update one GeneratedDocument.
     * @example
     * // Update one GeneratedDocument
     * const generatedDocument = await prisma.generatedDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneratedDocumentUpdateArgs>(args: SelectSubset<T, GeneratedDocumentUpdateArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneratedDocuments.
     * @param {GeneratedDocumentDeleteManyArgs} args - Arguments to filter GeneratedDocuments to delete.
     * @example
     * // Delete a few GeneratedDocuments
     * const { count } = await prisma.generatedDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneratedDocumentDeleteManyArgs>(args?: SelectSubset<T, GeneratedDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneratedDocuments
     * const generatedDocument = await prisma.generatedDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneratedDocumentUpdateManyArgs>(args: SelectSubset<T, GeneratedDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GeneratedDocument.
     * @param {GeneratedDocumentUpsertArgs} args - Arguments to update or create a GeneratedDocument.
     * @example
     * // Update or create a GeneratedDocument
     * const generatedDocument = await prisma.generatedDocument.upsert({
     *   create: {
     *     // ... data to create a GeneratedDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneratedDocument we want to update
     *   }
     * })
     */
    upsert<T extends GeneratedDocumentUpsertArgs>(args: SelectSubset<T, GeneratedDocumentUpsertArgs<ExtArgs>>): Prisma__GeneratedDocumentClient<$Result.GetResult<Prisma.$GeneratedDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneratedDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentCountArgs} args - Arguments to filter GeneratedDocuments to count.
     * @example
     * // Count the number of GeneratedDocuments
     * const count = await prisma.generatedDocument.count({
     *   where: {
     *     // ... the filter for the GeneratedDocuments we want to count
     *   }
     * })
    **/
    count<T extends GeneratedDocumentCountArgs>(
      args?: Subset<T, GeneratedDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneratedDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneratedDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GeneratedDocumentAggregateArgs>(args: Subset<T, GeneratedDocumentAggregateArgs>): Prisma.PrismaPromise<GetGeneratedDocumentAggregateType<T>>

    /**
     * Group by GeneratedDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedDocumentGroupByArgs} args - Group by arguments.
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
      T extends GeneratedDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneratedDocumentGroupByArgs['orderBy'] }
        : { orderBy?: GeneratedDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GeneratedDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneratedDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneratedDocument model
   */
  readonly fields: GeneratedDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneratedDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneratedDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends TemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TemplateDefaultArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the GeneratedDocument model
   */
  interface GeneratedDocumentFieldRefs {
    readonly id: FieldRef<"GeneratedDocument", 'Int'>
    readonly templateId: FieldRef<"GeneratedDocument", 'Int'>
    readonly filePath: FieldRef<"GeneratedDocument", 'String'>
    readonly createdAt: FieldRef<"GeneratedDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneratedDocument findUnique
   */
  export type GeneratedDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedDocument to fetch.
     */
    where: GeneratedDocumentWhereUniqueInput
  }

  /**
   * GeneratedDocument findUniqueOrThrow
   */
  export type GeneratedDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedDocument to fetch.
     */
    where: GeneratedDocumentWhereUniqueInput
  }

  /**
   * GeneratedDocument findFirst
   */
  export type GeneratedDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedDocument to fetch.
     */
    where?: GeneratedDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedDocuments to fetch.
     */
    orderBy?: GeneratedDocumentOrderByWithRelationInput | GeneratedDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedDocuments.
     */
    cursor?: GeneratedDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedDocuments.
     */
    distinct?: GeneratedDocumentScalarFieldEnum | GeneratedDocumentScalarFieldEnum[]
  }

  /**
   * GeneratedDocument findFirstOrThrow
   */
  export type GeneratedDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedDocument to fetch.
     */
    where?: GeneratedDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedDocuments to fetch.
     */
    orderBy?: GeneratedDocumentOrderByWithRelationInput | GeneratedDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedDocuments.
     */
    cursor?: GeneratedDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedDocuments.
     */
    distinct?: GeneratedDocumentScalarFieldEnum | GeneratedDocumentScalarFieldEnum[]
  }

  /**
   * GeneratedDocument findMany
   */
  export type GeneratedDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedDocuments to fetch.
     */
    where?: GeneratedDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedDocuments to fetch.
     */
    orderBy?: GeneratedDocumentOrderByWithRelationInput | GeneratedDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneratedDocuments.
     */
    cursor?: GeneratedDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedDocuments.
     */
    distinct?: GeneratedDocumentScalarFieldEnum | GeneratedDocumentScalarFieldEnum[]
  }

  /**
   * GeneratedDocument create
   */
  export type GeneratedDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a GeneratedDocument.
     */
    data: XOR<GeneratedDocumentCreateInput, GeneratedDocumentUncheckedCreateInput>
  }

  /**
   * GeneratedDocument createMany
   */
  export type GeneratedDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneratedDocuments.
     */
    data: GeneratedDocumentCreateManyInput | GeneratedDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneratedDocument update
   */
  export type GeneratedDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a GeneratedDocument.
     */
    data: XOR<GeneratedDocumentUpdateInput, GeneratedDocumentUncheckedUpdateInput>
    /**
     * Choose, which GeneratedDocument to update.
     */
    where: GeneratedDocumentWhereUniqueInput
  }

  /**
   * GeneratedDocument updateMany
   */
  export type GeneratedDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneratedDocuments.
     */
    data: XOR<GeneratedDocumentUpdateManyMutationInput, GeneratedDocumentUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedDocuments to update
     */
    where?: GeneratedDocumentWhereInput
    /**
     * Limit how many GeneratedDocuments to update.
     */
    limit?: number
  }

  /**
   * GeneratedDocument upsert
   */
  export type GeneratedDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the GeneratedDocument to update in case it exists.
     */
    where: GeneratedDocumentWhereUniqueInput
    /**
     * In case the GeneratedDocument found by the `where` argument doesn't exist, create a new GeneratedDocument with this data.
     */
    create: XOR<GeneratedDocumentCreateInput, GeneratedDocumentUncheckedCreateInput>
    /**
     * In case the GeneratedDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneratedDocumentUpdateInput, GeneratedDocumentUncheckedUpdateInput>
  }

  /**
   * GeneratedDocument delete
   */
  export type GeneratedDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
    /**
     * Filter which GeneratedDocument to delete.
     */
    where: GeneratedDocumentWhereUniqueInput
  }

  /**
   * GeneratedDocument deleteMany
   */
  export type GeneratedDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedDocuments to delete
     */
    where?: GeneratedDocumentWhereInput
    /**
     * Limit how many GeneratedDocuments to delete.
     */
    limit?: number
  }

  /**
   * GeneratedDocument without action
   */
  export type GeneratedDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedDocument
     */
    select?: GeneratedDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedDocument
     */
    omit?: GeneratedDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedDocumentInclude<ExtArgs> | null
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


  export const TemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    filePath: 'filePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const TemplateFieldScalarFieldEnum: {
    id: 'id',
    templateId: 'templateId',
    name: 'name',
    label: 'label',
    type: 'type',
    required: 'required'
  };

  export type TemplateFieldScalarFieldEnum = (typeof TemplateFieldScalarFieldEnum)[keyof typeof TemplateFieldScalarFieldEnum]


  export const GeneratedDocumentScalarFieldEnum: {
    id: 'id',
    templateId: 'templateId',
    filePath: 'filePath',
    createdAt: 'createdAt'
  };

  export type GeneratedDocumentScalarFieldEnum = (typeof GeneratedDocumentScalarFieldEnum)[keyof typeof GeneratedDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const TemplateOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description',
    filePath: 'filePath'
  };

  export type TemplateOrderByRelevanceFieldEnum = (typeof TemplateOrderByRelevanceFieldEnum)[keyof typeof TemplateOrderByRelevanceFieldEnum]


  export const TemplateFieldOrderByRelevanceFieldEnum: {
    name: 'name',
    label: 'label',
    type: 'type'
  };

  export type TemplateFieldOrderByRelevanceFieldEnum = (typeof TemplateFieldOrderByRelevanceFieldEnum)[keyof typeof TemplateFieldOrderByRelevanceFieldEnum]


  export const GeneratedDocumentOrderByRelevanceFieldEnum: {
    filePath: 'filePath'
  };

  export type GeneratedDocumentOrderByRelevanceFieldEnum = (typeof GeneratedDocumentOrderByRelevanceFieldEnum)[keyof typeof GeneratedDocumentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type TemplateWhereInput = {
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    id?: IntFilter<"Template"> | number
    name?: StringFilter<"Template"> | string
    description?: StringNullableFilter<"Template"> | string | null
    filePath?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
    fields?: TemplateFieldListRelationFilter
    documents?: GeneratedDocumentListRelationFilter
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fields?: TemplateFieldOrderByRelationAggregateInput
    documents?: GeneratedDocumentOrderByRelationAggregateInput
    _relevance?: TemplateOrderByRelevanceInput
  }

  export type TemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    name?: StringFilter<"Template"> | string
    description?: StringNullableFilter<"Template"> | string | null
    filePath?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
    fields?: TemplateFieldListRelationFilter
    documents?: GeneratedDocumentListRelationFilter
  }, "id">

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _avg?: TemplateAvgOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
    _sum?: TemplateSumOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    OR?: TemplateScalarWhereWithAggregatesInput[]
    NOT?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Template"> | number
    name?: StringWithAggregatesFilter<"Template"> | string
    description?: StringNullableWithAggregatesFilter<"Template"> | string | null
    filePath?: StringWithAggregatesFilter<"Template"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
  }

  export type TemplateFieldWhereInput = {
    AND?: TemplateFieldWhereInput | TemplateFieldWhereInput[]
    OR?: TemplateFieldWhereInput[]
    NOT?: TemplateFieldWhereInput | TemplateFieldWhereInput[]
    id?: IntFilter<"TemplateField"> | number
    templateId?: IntFilter<"TemplateField"> | number
    name?: StringFilter<"TemplateField"> | string
    label?: StringFilter<"TemplateField"> | string
    type?: StringFilter<"TemplateField"> | string
    required?: BoolFilter<"TemplateField"> | boolean
    template?: XOR<TemplateScalarRelationFilter, TemplateWhereInput>
  }

  export type TemplateFieldOrderByWithRelationInput = {
    id?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    template?: TemplateOrderByWithRelationInput
    _relevance?: TemplateFieldOrderByRelevanceInput
  }

  export type TemplateFieldWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TemplateFieldWhereInput | TemplateFieldWhereInput[]
    OR?: TemplateFieldWhereInput[]
    NOT?: TemplateFieldWhereInput | TemplateFieldWhereInput[]
    templateId?: IntFilter<"TemplateField"> | number
    name?: StringFilter<"TemplateField"> | string
    label?: StringFilter<"TemplateField"> | string
    type?: StringFilter<"TemplateField"> | string
    required?: BoolFilter<"TemplateField"> | boolean
    template?: XOR<TemplateScalarRelationFilter, TemplateWhereInput>
  }, "id">

  export type TemplateFieldOrderByWithAggregationInput = {
    id?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    _count?: TemplateFieldCountOrderByAggregateInput
    _avg?: TemplateFieldAvgOrderByAggregateInput
    _max?: TemplateFieldMaxOrderByAggregateInput
    _min?: TemplateFieldMinOrderByAggregateInput
    _sum?: TemplateFieldSumOrderByAggregateInput
  }

  export type TemplateFieldScalarWhereWithAggregatesInput = {
    AND?: TemplateFieldScalarWhereWithAggregatesInput | TemplateFieldScalarWhereWithAggregatesInput[]
    OR?: TemplateFieldScalarWhereWithAggregatesInput[]
    NOT?: TemplateFieldScalarWhereWithAggregatesInput | TemplateFieldScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TemplateField"> | number
    templateId?: IntWithAggregatesFilter<"TemplateField"> | number
    name?: StringWithAggregatesFilter<"TemplateField"> | string
    label?: StringWithAggregatesFilter<"TemplateField"> | string
    type?: StringWithAggregatesFilter<"TemplateField"> | string
    required?: BoolWithAggregatesFilter<"TemplateField"> | boolean
  }

  export type GeneratedDocumentWhereInput = {
    AND?: GeneratedDocumentWhereInput | GeneratedDocumentWhereInput[]
    OR?: GeneratedDocumentWhereInput[]
    NOT?: GeneratedDocumentWhereInput | GeneratedDocumentWhereInput[]
    id?: IntFilter<"GeneratedDocument"> | number
    templateId?: IntFilter<"GeneratedDocument"> | number
    filePath?: StringFilter<"GeneratedDocument"> | string
    createdAt?: DateTimeFilter<"GeneratedDocument"> | Date | string
    template?: XOR<TemplateScalarRelationFilter, TemplateWhereInput>
  }

  export type GeneratedDocumentOrderByWithRelationInput = {
    id?: SortOrder
    templateId?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    template?: TemplateOrderByWithRelationInput
    _relevance?: GeneratedDocumentOrderByRelevanceInput
  }

  export type GeneratedDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GeneratedDocumentWhereInput | GeneratedDocumentWhereInput[]
    OR?: GeneratedDocumentWhereInput[]
    NOT?: GeneratedDocumentWhereInput | GeneratedDocumentWhereInput[]
    templateId?: IntFilter<"GeneratedDocument"> | number
    filePath?: StringFilter<"GeneratedDocument"> | string
    createdAt?: DateTimeFilter<"GeneratedDocument"> | Date | string
    template?: XOR<TemplateScalarRelationFilter, TemplateWhereInput>
  }, "id">

  export type GeneratedDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    templateId?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    _count?: GeneratedDocumentCountOrderByAggregateInput
    _avg?: GeneratedDocumentAvgOrderByAggregateInput
    _max?: GeneratedDocumentMaxOrderByAggregateInput
    _min?: GeneratedDocumentMinOrderByAggregateInput
    _sum?: GeneratedDocumentSumOrderByAggregateInput
  }

  export type GeneratedDocumentScalarWhereWithAggregatesInput = {
    AND?: GeneratedDocumentScalarWhereWithAggregatesInput | GeneratedDocumentScalarWhereWithAggregatesInput[]
    OR?: GeneratedDocumentScalarWhereWithAggregatesInput[]
    NOT?: GeneratedDocumentScalarWhereWithAggregatesInput | GeneratedDocumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GeneratedDocument"> | number
    templateId?: IntWithAggregatesFilter<"GeneratedDocument"> | number
    filePath?: StringWithAggregatesFilter<"GeneratedDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GeneratedDocument"> | Date | string
  }

  export type TemplateCreateInput = {
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fields?: TemplateFieldCreateNestedManyWithoutTemplateInput
    documents?: GeneratedDocumentCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fields?: TemplateFieldUncheckedCreateNestedManyWithoutTemplateInput
    documents?: GeneratedDocumentUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: TemplateFieldUpdateManyWithoutTemplateNestedInput
    documents?: GeneratedDocumentUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: TemplateFieldUncheckedUpdateManyWithoutTemplateNestedInput
    documents?: GeneratedDocumentUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateFieldCreateInput = {
    name: string
    label: string
    type?: string
    required?: boolean
    template: TemplateCreateNestedOneWithoutFieldsInput
  }

  export type TemplateFieldUncheckedCreateInput = {
    id?: number
    templateId: number
    name: string
    label: string
    type?: string
    required?: boolean
  }

  export type TemplateFieldUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    template?: TemplateUpdateOneRequiredWithoutFieldsNestedInput
  }

  export type TemplateFieldUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateFieldCreateManyInput = {
    id?: number
    templateId: number
    name: string
    label: string
    type?: string
    required?: boolean
  }

  export type TemplateFieldUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateFieldUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GeneratedDocumentCreateInput = {
    filePath: string
    createdAt?: Date | string
    template: TemplateCreateNestedOneWithoutDocumentsInput
  }

  export type GeneratedDocumentUncheckedCreateInput = {
    id?: number
    templateId: number
    filePath: string
    createdAt?: Date | string
  }

  export type GeneratedDocumentUpdateInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: TemplateUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type GeneratedDocumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateId?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedDocumentCreateManyInput = {
    id?: number
    templateId: number
    filePath: string
    createdAt?: Date | string
  }

  export type GeneratedDocumentUpdateManyMutationInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedDocumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateId?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TemplateFieldListRelationFilter = {
    every?: TemplateFieldWhereInput
    some?: TemplateFieldWhereInput
    none?: TemplateFieldWhereInput
  }

  export type GeneratedDocumentListRelationFilter = {
    every?: GeneratedDocumentWhereInput
    some?: GeneratedDocumentWhereInput
    none?: GeneratedDocumentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TemplateFieldOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GeneratedDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TemplateOrderByRelevanceInput = {
    fields: TemplateOrderByRelevanceFieldEnum | TemplateOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TemplateScalarRelationFilter = {
    is?: TemplateWhereInput
    isNot?: TemplateWhereInput
  }

  export type TemplateFieldOrderByRelevanceInput = {
    fields: TemplateFieldOrderByRelevanceFieldEnum | TemplateFieldOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TemplateFieldCountOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
  }

  export type TemplateFieldAvgOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
  }

  export type TemplateFieldMaxOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
  }

  export type TemplateFieldMinOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
  }

  export type TemplateFieldSumOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GeneratedDocumentOrderByRelevanceInput = {
    fields: GeneratedDocumentOrderByRelevanceFieldEnum | GeneratedDocumentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GeneratedDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedDocumentAvgOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
  }

  export type GeneratedDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedDocumentSumOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
  }

  export type TemplateFieldCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateFieldCreateWithoutTemplateInput, TemplateFieldUncheckedCreateWithoutTemplateInput> | TemplateFieldCreateWithoutTemplateInput[] | TemplateFieldUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateFieldCreateOrConnectWithoutTemplateInput | TemplateFieldCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateFieldCreateManyTemplateInputEnvelope
    connect?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
  }

  export type GeneratedDocumentCreateNestedManyWithoutTemplateInput = {
    create?: XOR<GeneratedDocumentCreateWithoutTemplateInput, GeneratedDocumentUncheckedCreateWithoutTemplateInput> | GeneratedDocumentCreateWithoutTemplateInput[] | GeneratedDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: GeneratedDocumentCreateOrConnectWithoutTemplateInput | GeneratedDocumentCreateOrConnectWithoutTemplateInput[]
    createMany?: GeneratedDocumentCreateManyTemplateInputEnvelope
    connect?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
  }

  export type TemplateFieldUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateFieldCreateWithoutTemplateInput, TemplateFieldUncheckedCreateWithoutTemplateInput> | TemplateFieldCreateWithoutTemplateInput[] | TemplateFieldUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateFieldCreateOrConnectWithoutTemplateInput | TemplateFieldCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateFieldCreateManyTemplateInputEnvelope
    connect?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
  }

  export type GeneratedDocumentUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<GeneratedDocumentCreateWithoutTemplateInput, GeneratedDocumentUncheckedCreateWithoutTemplateInput> | GeneratedDocumentCreateWithoutTemplateInput[] | GeneratedDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: GeneratedDocumentCreateOrConnectWithoutTemplateInput | GeneratedDocumentCreateOrConnectWithoutTemplateInput[]
    createMany?: GeneratedDocumentCreateManyTemplateInputEnvelope
    connect?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TemplateFieldUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateFieldCreateWithoutTemplateInput, TemplateFieldUncheckedCreateWithoutTemplateInput> | TemplateFieldCreateWithoutTemplateInput[] | TemplateFieldUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateFieldCreateOrConnectWithoutTemplateInput | TemplateFieldCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateFieldUpsertWithWhereUniqueWithoutTemplateInput | TemplateFieldUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateFieldCreateManyTemplateInputEnvelope
    set?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    disconnect?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    delete?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    connect?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    update?: TemplateFieldUpdateWithWhereUniqueWithoutTemplateInput | TemplateFieldUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateFieldUpdateManyWithWhereWithoutTemplateInput | TemplateFieldUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateFieldScalarWhereInput | TemplateFieldScalarWhereInput[]
  }

  export type GeneratedDocumentUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<GeneratedDocumentCreateWithoutTemplateInput, GeneratedDocumentUncheckedCreateWithoutTemplateInput> | GeneratedDocumentCreateWithoutTemplateInput[] | GeneratedDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: GeneratedDocumentCreateOrConnectWithoutTemplateInput | GeneratedDocumentCreateOrConnectWithoutTemplateInput[]
    upsert?: GeneratedDocumentUpsertWithWhereUniqueWithoutTemplateInput | GeneratedDocumentUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: GeneratedDocumentCreateManyTemplateInputEnvelope
    set?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    disconnect?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    delete?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    connect?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    update?: GeneratedDocumentUpdateWithWhereUniqueWithoutTemplateInput | GeneratedDocumentUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: GeneratedDocumentUpdateManyWithWhereWithoutTemplateInput | GeneratedDocumentUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: GeneratedDocumentScalarWhereInput | GeneratedDocumentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TemplateFieldUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateFieldCreateWithoutTemplateInput, TemplateFieldUncheckedCreateWithoutTemplateInput> | TemplateFieldCreateWithoutTemplateInput[] | TemplateFieldUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateFieldCreateOrConnectWithoutTemplateInput | TemplateFieldCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateFieldUpsertWithWhereUniqueWithoutTemplateInput | TemplateFieldUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateFieldCreateManyTemplateInputEnvelope
    set?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    disconnect?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    delete?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    connect?: TemplateFieldWhereUniqueInput | TemplateFieldWhereUniqueInput[]
    update?: TemplateFieldUpdateWithWhereUniqueWithoutTemplateInput | TemplateFieldUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateFieldUpdateManyWithWhereWithoutTemplateInput | TemplateFieldUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateFieldScalarWhereInput | TemplateFieldScalarWhereInput[]
  }

  export type GeneratedDocumentUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<GeneratedDocumentCreateWithoutTemplateInput, GeneratedDocumentUncheckedCreateWithoutTemplateInput> | GeneratedDocumentCreateWithoutTemplateInput[] | GeneratedDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: GeneratedDocumentCreateOrConnectWithoutTemplateInput | GeneratedDocumentCreateOrConnectWithoutTemplateInput[]
    upsert?: GeneratedDocumentUpsertWithWhereUniqueWithoutTemplateInput | GeneratedDocumentUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: GeneratedDocumentCreateManyTemplateInputEnvelope
    set?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    disconnect?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    delete?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    connect?: GeneratedDocumentWhereUniqueInput | GeneratedDocumentWhereUniqueInput[]
    update?: GeneratedDocumentUpdateWithWhereUniqueWithoutTemplateInput | GeneratedDocumentUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: GeneratedDocumentUpdateManyWithWhereWithoutTemplateInput | GeneratedDocumentUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: GeneratedDocumentScalarWhereInput | GeneratedDocumentScalarWhereInput[]
  }

  export type TemplateCreateNestedOneWithoutFieldsInput = {
    create?: XOR<TemplateCreateWithoutFieldsInput, TemplateUncheckedCreateWithoutFieldsInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutFieldsInput
    connect?: TemplateWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TemplateUpdateOneRequiredWithoutFieldsNestedInput = {
    create?: XOR<TemplateCreateWithoutFieldsInput, TemplateUncheckedCreateWithoutFieldsInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutFieldsInput
    upsert?: TemplateUpsertWithoutFieldsInput
    connect?: TemplateWhereUniqueInput
    update?: XOR<XOR<TemplateUpdateToOneWithWhereWithoutFieldsInput, TemplateUpdateWithoutFieldsInput>, TemplateUncheckedUpdateWithoutFieldsInput>
  }

  export type TemplateCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<TemplateCreateWithoutDocumentsInput, TemplateUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutDocumentsInput
    connect?: TemplateWhereUniqueInput
  }

  export type TemplateUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<TemplateCreateWithoutDocumentsInput, TemplateUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutDocumentsInput
    upsert?: TemplateUpsertWithoutDocumentsInput
    connect?: TemplateWhereUniqueInput
    update?: XOR<XOR<TemplateUpdateToOneWithWhereWithoutDocumentsInput, TemplateUpdateWithoutDocumentsInput>, TemplateUncheckedUpdateWithoutDocumentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TemplateFieldCreateWithoutTemplateInput = {
    name: string
    label: string
    type?: string
    required?: boolean
  }

  export type TemplateFieldUncheckedCreateWithoutTemplateInput = {
    id?: number
    name: string
    label: string
    type?: string
    required?: boolean
  }

  export type TemplateFieldCreateOrConnectWithoutTemplateInput = {
    where: TemplateFieldWhereUniqueInput
    create: XOR<TemplateFieldCreateWithoutTemplateInput, TemplateFieldUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateFieldCreateManyTemplateInputEnvelope = {
    data: TemplateFieldCreateManyTemplateInput | TemplateFieldCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type GeneratedDocumentCreateWithoutTemplateInput = {
    filePath: string
    createdAt?: Date | string
  }

  export type GeneratedDocumentUncheckedCreateWithoutTemplateInput = {
    id?: number
    filePath: string
    createdAt?: Date | string
  }

  export type GeneratedDocumentCreateOrConnectWithoutTemplateInput = {
    where: GeneratedDocumentWhereUniqueInput
    create: XOR<GeneratedDocumentCreateWithoutTemplateInput, GeneratedDocumentUncheckedCreateWithoutTemplateInput>
  }

  export type GeneratedDocumentCreateManyTemplateInputEnvelope = {
    data: GeneratedDocumentCreateManyTemplateInput | GeneratedDocumentCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type TemplateFieldUpsertWithWhereUniqueWithoutTemplateInput = {
    where: TemplateFieldWhereUniqueInput
    update: XOR<TemplateFieldUpdateWithoutTemplateInput, TemplateFieldUncheckedUpdateWithoutTemplateInput>
    create: XOR<TemplateFieldCreateWithoutTemplateInput, TemplateFieldUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateFieldUpdateWithWhereUniqueWithoutTemplateInput = {
    where: TemplateFieldWhereUniqueInput
    data: XOR<TemplateFieldUpdateWithoutTemplateInput, TemplateFieldUncheckedUpdateWithoutTemplateInput>
  }

  export type TemplateFieldUpdateManyWithWhereWithoutTemplateInput = {
    where: TemplateFieldScalarWhereInput
    data: XOR<TemplateFieldUpdateManyMutationInput, TemplateFieldUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplateFieldScalarWhereInput = {
    AND?: TemplateFieldScalarWhereInput | TemplateFieldScalarWhereInput[]
    OR?: TemplateFieldScalarWhereInput[]
    NOT?: TemplateFieldScalarWhereInput | TemplateFieldScalarWhereInput[]
    id?: IntFilter<"TemplateField"> | number
    templateId?: IntFilter<"TemplateField"> | number
    name?: StringFilter<"TemplateField"> | string
    label?: StringFilter<"TemplateField"> | string
    type?: StringFilter<"TemplateField"> | string
    required?: BoolFilter<"TemplateField"> | boolean
  }

  export type GeneratedDocumentUpsertWithWhereUniqueWithoutTemplateInput = {
    where: GeneratedDocumentWhereUniqueInput
    update: XOR<GeneratedDocumentUpdateWithoutTemplateInput, GeneratedDocumentUncheckedUpdateWithoutTemplateInput>
    create: XOR<GeneratedDocumentCreateWithoutTemplateInput, GeneratedDocumentUncheckedCreateWithoutTemplateInput>
  }

  export type GeneratedDocumentUpdateWithWhereUniqueWithoutTemplateInput = {
    where: GeneratedDocumentWhereUniqueInput
    data: XOR<GeneratedDocumentUpdateWithoutTemplateInput, GeneratedDocumentUncheckedUpdateWithoutTemplateInput>
  }

  export type GeneratedDocumentUpdateManyWithWhereWithoutTemplateInput = {
    where: GeneratedDocumentScalarWhereInput
    data: XOR<GeneratedDocumentUpdateManyMutationInput, GeneratedDocumentUncheckedUpdateManyWithoutTemplateInput>
  }

  export type GeneratedDocumentScalarWhereInput = {
    AND?: GeneratedDocumentScalarWhereInput | GeneratedDocumentScalarWhereInput[]
    OR?: GeneratedDocumentScalarWhereInput[]
    NOT?: GeneratedDocumentScalarWhereInput | GeneratedDocumentScalarWhereInput[]
    id?: IntFilter<"GeneratedDocument"> | number
    templateId?: IntFilter<"GeneratedDocument"> | number
    filePath?: StringFilter<"GeneratedDocument"> | string
    createdAt?: DateTimeFilter<"GeneratedDocument"> | Date | string
  }

  export type TemplateCreateWithoutFieldsInput = {
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: GeneratedDocumentCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateWithoutFieldsInput = {
    id?: number
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: GeneratedDocumentUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateCreateOrConnectWithoutFieldsInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutFieldsInput, TemplateUncheckedCreateWithoutFieldsInput>
  }

  export type TemplateUpsertWithoutFieldsInput = {
    update: XOR<TemplateUpdateWithoutFieldsInput, TemplateUncheckedUpdateWithoutFieldsInput>
    create: XOR<TemplateCreateWithoutFieldsInput, TemplateUncheckedCreateWithoutFieldsInput>
    where?: TemplateWhereInput
  }

  export type TemplateUpdateToOneWithWhereWithoutFieldsInput = {
    where?: TemplateWhereInput
    data: XOR<TemplateUpdateWithoutFieldsInput, TemplateUncheckedUpdateWithoutFieldsInput>
  }

  export type TemplateUpdateWithoutFieldsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: GeneratedDocumentUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateWithoutFieldsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: GeneratedDocumentUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateCreateWithoutDocumentsInput = {
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fields?: TemplateFieldCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateWithoutDocumentsInput = {
    id?: number
    name: string
    description?: string | null
    filePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fields?: TemplateFieldUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateCreateOrConnectWithoutDocumentsInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutDocumentsInput, TemplateUncheckedCreateWithoutDocumentsInput>
  }

  export type TemplateUpsertWithoutDocumentsInput = {
    update: XOR<TemplateUpdateWithoutDocumentsInput, TemplateUncheckedUpdateWithoutDocumentsInput>
    create: XOR<TemplateCreateWithoutDocumentsInput, TemplateUncheckedCreateWithoutDocumentsInput>
    where?: TemplateWhereInput
  }

  export type TemplateUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: TemplateWhereInput
    data: XOR<TemplateUpdateWithoutDocumentsInput, TemplateUncheckedUpdateWithoutDocumentsInput>
  }

  export type TemplateUpdateWithoutDocumentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: TemplateFieldUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: TemplateFieldUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateFieldCreateManyTemplateInput = {
    id?: number
    name: string
    label: string
    type?: string
    required?: boolean
  }

  export type GeneratedDocumentCreateManyTemplateInput = {
    id?: number
    filePath: string
    createdAt?: Date | string
  }

  export type TemplateFieldUpdateWithoutTemplateInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateFieldUncheckedUpdateWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateFieldUncheckedUpdateManyWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GeneratedDocumentUpdateWithoutTemplateInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedDocumentUncheckedUpdateWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedDocumentUncheckedUpdateManyWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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