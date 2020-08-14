import { Router, Request, Response } from 'express';
const router = Router();

//Modelo
import Vehiculo from '../models/Vehiculo';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('vehiculos/create');
    })  
    .post(async(req: Request, res: Response) => {
        const { manufacturer, model, model_year, vehicle_description, mileage, vehicle_condition } = req.body;
        const vehiculo = new Vehiculo({ manufacturer, model, model_year, vehicle_description, mileage, vehicle_condition });
        await vehiculo.save();
        res.redirect('/vehiculos/list');    
    });

router.route('/list')
    .get(async (req: Request, res: Response) => {
        const vehiculos = await Vehiculo.find();
        //console.log(vehiculos);
        res.render('vehiculos/list', { vehiculos });
    })

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Vehiculo.findByIdAndDelete(id);
        res.redirect('/vehiculos/list');
    });

router.route('/edit/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const vehiculo = await Vehiculo.findById(id);
        console.log(vehiculo);
        res.render('vehiculos/edit', { vehiculo });
    })
    .post(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { manufacturer, model, model_year, vehicle_description, mileage, vehicle_condition } = req.body;
        await Vehiculo.findByIdAndUpdate(id, {
            manufacturer, model, model_year, vehicle_description, mileage, vehicle_condition
        });
        res.redirect('/vehiculos/list');
    })

export default router;