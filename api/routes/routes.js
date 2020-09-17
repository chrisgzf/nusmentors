var express = require("express");
var router = express.Router();

/*------ GENERAL -------*/
const getcareerfields = require("./impl/getcareerfields");

router.route("/careers").get(getcareerfields);
/*====== GENERAL =======*/

/*------- AUTH ---------*/
const createnewuser = require("./impl/auth/createnewuser");
const updatenusemail = require("./impl/auth/updatenusemail");
const verifyemail = require("./impl/auth/verifyemail");
const updateinfo = require("./impl/auth/updateinfo");
const authenticate = require("./impl/auth/authenticate");

router.route("/auth")
    .post(createnewuser);
router.route("/auth/nusemail")
    .put(updatenusemail);
router.route("/auth/verify")
    .put(verifyemail);
router.route("/auth/:uid")
    .put(updateinfo)
    .post(authenticate);
/*====== END AUTH ======*/

/*-------- REQS --------*/
const postnewhelp = require("./impl/reqs/postnewhelp");
const getallrequests = require("./impl/reqs/getallrequests");
const deleterequest = require("./impl/reqs/deleterequest");
const updaterequest = require("./impl/reqs/updaterequest");
const acceptrequest = require("./impl/reqs/acceptrequest");

router.route("/reqs")
    .post(postnewhelp)
    .get(getallrequests);
router.route("/reqs/:req_id")
    .delete(deleterequest)
    .put(updaterequest);
router.route("/reqs/:req_id/:mentor_uid")
    .put(acceptrequest);
/*====== END REQS ======*/

/*------ MATCHES -------*/
const getcontact = require("./impl/matches/getcontact");
const dropmentee = require("./impl/matches/dropmentee");
const markascomplete = require("./impl/matches/markascomplete");

router.route("/matches/:req_id/:requester_uid")
    .get(getcontact);
router.route("/matches/:req_id")
    .delete(dropmentee)
    .put(markascomplete);
/*===== END MATCHES ====*/
