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
router.route("/auth/info")
    .get(auth.getuserinfo)
    .put(auth.updateinfo);
router.route("/auth/verify")
    .put(auth.verifyemail)
    .get(auth.checkifverified);
/*====== END AUTH ======*/

/*-------- REQS --------*/

const reqs = require("./impl/reqs");

router.route("/reqs")
    .get(reqs.getallrequests) //returns user info (not id)
    .post(reqs.postnewrequest);

router.route("/reqs/:req_id")
    .delete(reqs.deleterequest)
    .put(reqs.updaterequest);

router.route("/reqs/:req_id/accept")
    .put(reqs.acceptrequest);

/*====== END REQS ======*/

/*------ MATCHES -------*/
const matches = require("./impl/matches");

router.route("/matches/contact/:req_id")
    .get(matches.getcontact); //obsolete
router.route("/matches/:req_id")
    .delete(matches.dropmentee)
    .put(matches.markascomplete);

router.route("/matches/mentees")
    .get(matches.getmenteementorships); //includes status dropped/completed
router.route("/matches/mentors")
    .get(matches.getmentormentorships);
/*===== END MATCHES ====*/

/*------ NOTIFICATIONS -------*/
const getnotifications = require("./impl/getnotifications");
router.route("/notifs").get(getnotifications);

/*===== END NOTIFICATIONS====*/

module.exports = router;
