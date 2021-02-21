import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';

//Routes
import indexRoutes from './routes';
import vehiculosRoutes from './routes/vehiculos';

class Application{

    app: express.Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', 3000);
        
        /*const _hbs = exphbs.create({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs',
            helpers: {
                foo: function () { return 'FOO!'; },
                bar: function () { return 'BAR!'; }
            }
        });

        this.app.engine('.hbs', _hbs.engine);
        this.app.set('view engine', '.hbs');*/

        
        this.app.set('views', path.join(__dirname,'views'));
        this.app.engine('.hbs', exphbs({
            helpers: {
                foo: function () { return 'FOO!'; },
                bar: function () { return 'BAR!'; }
            },
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(){
        this.app.use('/', indexRoutes);
        this.app.use('/vehiculos', vehiculosRoutes);
        
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
        });
    }
}

export default Application;
