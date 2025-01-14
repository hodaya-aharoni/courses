import { orderModel } from '../modules/order.js'

//קבלת כל ההזמנות
export async function getAllOrders(req, res) {
    try {
        let data = await orderModel.find()
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't get all orders", massege: err.massege })
    }
}


//הוספת הזמנה חדשה
export async function addOrder(req, res) {
    let { body } = req
    if (!body.userId || !body.courses)
        return res.status(400).json({ title: "can't add new order", massege: "you are missing required fields" })

    if (body.date || body.confirmation || body.isPay || body.totalSum)
        return res.status(400).json({ title: "fields error", massege: "you tried to initialize a date field" })


    try {

        let newData = new orderModel(body)
        newData.isPay = true;
        newData.totalSum = body.courses.map(item => item.price).reduce((sum, price) => sum + price, 0);
        newData.countCourses = body.courses.map(item => 1)
        let data = await newData.save()
        res.json(data)
    }

    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't add new order", massege: err.massege })
    }
}




//מחיקת הזמנה וזה ינתן רק אם עדין לא ניתן אישור הזמנה
export async function deleteOrderById(req, res) {
    let { id } = req.params

    try {
        let data = await orderModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({ title: "can't delete this order", massege: "No such id found" })


        if (data.confirmation)
            return res.status(400).json({ title: "can't delete this order", massege: "confirmation is true" })
        res.json(data)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't delete this order", massege: err.massege })
    }
}



//קבלת כל ההזמנות של משתמש מסוים
export async function getOrdersByUser(req, res) {
    let { userId } = req.params
    try {
        let result = await orderModel.find({ userId: userId })
        res.json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't get all order for this user", massege: err.massege })
    }

}


//עדכון אישור הזמנה לtrue
export async function updateConfirmation(req, res) {
    let { orderId } = req.params
    try {
        let result = await orderModel.findByIdAndUpdate(orderId, { confirmation: true }, { new: true })
        res.json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't update confirmation", massege: err.massege })
    }

}








