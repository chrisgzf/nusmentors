var express = require("express");
var router = express.Router();

/*------ GENERAL -------*/
const getcareerfields = require("./impl/getcareerfields");

router.route("/careers").get(getcareerfields);
/*====== GENERAL =======*/

/*------- AUTH ---------*/
const auth = require("./impl/auth");

router.route("/auth")
    .post(auth.createnewuser)
    .put(auth.updatenusemail);
router.route("/auth/:uid")
    .get(auth.getuserinfo)
    .put(auth.updateinfo)
    .post(auth.authenticate);
router.route("/auth/:uid/verify")
    .put(auth.verifyemail)
    .get(auth.checkifverified);
/*====== END AUTH ======*/

/*-------- REQS --------*/

const reqs = require("./impl/reqs");

router.route("/reqs")
    .get(reqs.getallrequests)
    .post(reqs.postnewrequest);

router.route("/reqs/:req_id")
    .delete(reqs.deleterequest)
    .put(reqs.updaterequest);

router.route("/reqs/:req_id/:mentor_uid")
    .put(reqs.acceptrequest);

/*====== END REQS ======*/

/*------ MATCHES -------*/
const matches = require("./impl/matches");

router.route("/matches/:req_id/:requester_uid")
    .get(matches.getcontact);
router.route("/matches/:req_id")
    .get(matches.getmentorship)
    .delete(matches.dropmentee)
    .put(matches.markascomplete);
/*===== END MATCHES ====*/

module.exports = router;
