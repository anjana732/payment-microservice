import app from './app.js'
import {logger} from './utils/logger.js'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT , ()=>{
    logger.info(`app is listining on port : ${PORT}`)
})