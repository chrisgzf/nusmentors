var express = require("express");
var router = express.Router();

/*------ GENERAL -------*/
const getcareerfields = require("./impl/getcareerfields");

router.route("/careers").get(getcareerfields);
/*====== GENERAL =======*/

/*------- AUTH ---------*/
const createnewuser = require("./impl/auth/createnewuser");
const updatenusemail = require("./impl/auth/updatenusemail");
const changepassword = require("./impl/auth/changepassword");
const verifyemail = require("./impl/auth/verifyemail");
const updateinfo = require("./impl/auth/updateinfo");
const authenticate = require("./impl/auth/authenticate");

router.route("/auth/newuser").post(createnewuser);
router.route("/auth/nusemail").put(updatenusemail);
router.route("/auth/password").put(changepassword);
router.route("/auth/verify").put(verifyemail);
router.route("/auth/user/:uid").put(updateinfo);
router.route("/auth/passport").post(authenticate);
/*====== END AUTH ======*/

/*-------- REQS --------*/
const postnewhelp = require("./impl/reqs/postnewhelp");
const getallrequests = require("./impl/reqs/getallrequests");
const deleterequest = require("./impl/reqs/deleterequest");
const updaterequest = require("./impl/reqs/updaterequest");
const acceptrequest = require("./impl/reqs/acceptrequest");

router.route("/reqs/newhelp").post(postnewhelp);
router.route("/reqs/all").get(getallrequests);
router.route("/reqs/delete/:req_id").delete(deleterequest);
router.route("/reqs/update/:req_id").put(updaterequest);
router.route("/reqs/accept/:req_id").put(acceptrequest);
/*====== END REQS ======*/

/*------ MATCHES -------*/
const getcontact = require("./impl/matches/getcontact");
const dropmentee = require("./impl/matches/dropmentee");
const markascomplete = require("./impl/matches/markascomplete");

router.route("/matches/contact/:req_id/:requester_uid").get(getcontact);
router.route("/matches/delete/:req_id").delete(dropmentee);
router.route("/matches/done/:req_id").put(markascomplete);
/*===== END MATCHES ====*/
