import { Schema, model } from 'mongoose';

const VehiculoSchema = new Schema({
    "manufacturer":{
        type: String,
        required: true
    },
    "model":{
        type: String,
        required: true
    },
    "model_year":{
        type: String,
        required: true
    },
    "vehicle_description":{
        type: String
    },
    "mileage":{
        type: Number
    },
    "vehicle_condition":{
        type: String,
        required: true
    }
});

export default model('Vehiculo', VehiculoSchema);