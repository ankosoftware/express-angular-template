export default function cors(req, res, next) {
        let origin = req.headers.origin || '*';
        res.header("Access-Control-Allow-Origin", origin);
        let allowHeaders = req.headers['Access-Control-Request-Headers'] || 'X-PageCount, X-Page, X-PageSize, X-Total, Content-Type';
        res.header("Access-Control-Allow-Headers", allowHeaders);
        res.header("Access-Control-Expose-Headers", allowHeaders);
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, HEAD, PATH");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
}
