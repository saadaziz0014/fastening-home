import mongoose from "mongoose";

const PrLine = mongoose.models.PrLine || mongoose.model('PrLine', mongoose.Schema({}, { collection: 'pr_lines' }));

const PrClass = mongoose.models.PrClass || mongoose.model('PrClass', mongoose.Schema({}, { collection: 'pr_class' }));

const PrCode = mongoose.models.PrCode || mongoose.model('PrCode', mongoose.Schema({}, { collection: 'pr_codes' }));

const PrMaster = mongoose.models.PrMaster || mongoose.model('PrMaster', mongoose.Schema({}, { collection: 'pr_master' }));

const SalesFHI = mongoose.models.SalesFHI || mongoose.model('SalesFHI', mongoose.Schema({}, { collection: 'sales_fhi' }));

const SalesSabre = mongoose.models.SalesSabre || mongoose.model('SalesSabre', mongoose.Schema({}, { collection: 'sales_sabre' }));

const VendMast = mongoose.models.VendMast || mongoose.model('VendMast', mongoose.Schema({}, { collection: 'vend_mast' }));

const WareMast = mongoose.models.WareMast || mongoose.model('WareMast', mongoose.Schema({}, { collection: 'ware_mast' }));

const Group = mongoose.models.Group || mongoose.model('Group', mongoose.Schema({}, { collection: 'groups' }));

const models = {
    PrLine,
    PrClass,
    PrCode,
    PrMaster,
    SalesFHI,
    SalesSabre,
    VendMast,
    WareMast,
    Group
}

export default models