const devConfig = {
    MONGO_URL: "mongodb://localhost/facemash-dev"
};

const testConfig = {
    MONGO_URL: "mongodb://localhost/facemash-test"
};

const prodConfig = {
    MONGO_URL: "mongodb://localhost/facemash-prod"
};

const defaultConfig = {
    PORT: process.env.PORT || 8000
};

function envConfig(env) {
    switch (env) {
        case "development":
            return devConfig;
        case "test":
            return testConfig;
        default:
            return prodConfig;
    }
}

export default {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV)
};
