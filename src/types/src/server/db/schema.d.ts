/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export declare const createTable: import("drizzle-orm/mysql-core").MySqlTableFn<undefined>;
export declare const posts: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "post";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "post";
            dataType: "number";
            columnType: "MySqlBigInt53";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        name: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "name";
            tableName: "post";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        createdById: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "createdById";
            tableName: "post";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        createdAt: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "created_at";
            tableName: "post";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updatedAt: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "updatedAt";
            tableName: "post";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
export declare const users: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "user";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        name: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "name";
            tableName: "user";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        email: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "email";
            tableName: "user";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        emailVerified: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "emailVerified";
            tableName: "user";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        image: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "image";
            tableName: "user";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
export declare const usersRelations: import("drizzle-orm").Relations<"user", {
    accounts: import("drizzle-orm").Many<"account">;
    sessions: import("drizzle-orm").Many<"session">;
    tokens: import("drizzle-orm").Many<"token">;
}>;
export declare const accounts: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "account";
    schema: undefined;
    columns: {
        userId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "userId";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        type: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "type";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: "email" | "oidc" | "oauth" | "webauthn";
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        provider: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "provider";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        providerAccountId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "providerAccountId";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        refresh_token: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "refresh_token";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        access_token: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "access_token";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        expires_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "expires_at";
            tableName: "account";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        token_type: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "token_type";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        scope: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "scope";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        id_token: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id_token";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        session_state: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "session_state";
            tableName: "account";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
export declare const accountsRelations: import("drizzle-orm").Relations<"account", {
    user: import("drizzle-orm").One<"user", true>;
}>;
export declare const tokens: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "token";
    schema: undefined;
    columns: {
        userId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "userId";
            tableName: "token";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        providerAccessToken: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "providerAccessToken";
            tableName: "token";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        provider: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "provider";
            tableName: "token";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: "spotify";
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: ["spotify"];
            baseColumn: never;
        }, object>;
        expires: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "expires";
            tableName: "token";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
export declare const tokensRelations: import("drizzle-orm").Relations<"token", {
    user: import("drizzle-orm").One<"user", true>;
}>;
export declare const sessions: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "session";
    schema: undefined;
    columns: {
        userId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "userId";
            tableName: "session";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        sessionToken: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "sessionToken";
            tableName: "session";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        expires: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "expires";
            tableName: "session";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
export declare const sessionsRelations: import("drizzle-orm").Relations<"session", {
    user: import("drizzle-orm").One<"user", true>;
}>;
export declare const verificationTokens: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "verificationToken";
    schema: undefined;
    columns: {
        identifier: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "identifier";
            tableName: "verificationToken";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        token: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "token";
            tableName: "verificationToken";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        expires: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "expires";
            tableName: "verificationToken";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
//# sourceMappingURL=schema.d.ts.map