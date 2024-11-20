const express =require('express')
const userController =require('../controller/userController')
const donarController=require('../controller/donarController')
const campController =require('../controller/campController')
const jwtmiddleware =require('../middlewares/jwtmiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router =new express.Router()

router.post('/registerUser',userController.registerUserController)
router.post('/registerHospital',userController.registerHospitalController)

router.post('/loginUser',userController.loginUserController)
router.post('/loginHospital',userController.loginHospitalController)
router.post('/add-donar',jwtmiddleware,donarController.addDonarController)
router.post('/add-camp',jwtmiddleware,multerMiddleware.single("venuePic"),campController.addCampController)

router.get('/home-camps',campController.getHomeCampController)
router.get('/all-donars',donarController.getAllDonarController)
router.get('/all-camps',jwtmiddleware,campController.getAllCampController)
router.delete('/:pid/remove-donar',jwtmiddleware,donarController.deleteDonarController)
router.get('/all-hospitals',jwtmiddleware,userController.getAllHospitals)
router.delete('/:cid/remove-camp',jwtmiddleware,campController.deleteCampController)
router.put('/:cid/edit-camp',jwtmiddleware,multerMiddleware.single("venuePic"),campController.editCampController)
router.put('/hospital/edit',jwtmiddleware,multerMiddleware.single("hospitalPic"),userController.editHospitalProfile)
router.put('/user/edit',jwtmiddleware,multerMiddleware.single("profilePic"),userController.editUserProfile)
router.get('/all-hospitalCamps',jwtmiddleware,campController.getAllCampHospitalController)
router.post('/add-booking',jwtmiddleware,campController.addBookingController)
router.get('/all-campBookings',jwtmiddleware,campController.getAllCampBookingsController)



module.exports = router