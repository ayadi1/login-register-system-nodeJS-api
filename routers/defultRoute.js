const express = require("express");

const route = express.Router();

route.route("*").get().patch().post().delete();
