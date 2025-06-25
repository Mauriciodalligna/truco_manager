import express, {Application} from "express"
import cors from "cors"
import routerUser from "./routes/userRoute"
import routerMatch from "./routes/matchRoute"
import routerLogin from "./routes/loginRoute"
import errorHandler from "./middleware/errorHandler"

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/api", routerUser)
app.use("/api", routerMatch)
app.use("/api", routerLogin)

app.use(errorHandler);

export default app