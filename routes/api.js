/*
 * Serve JSON to our AngularJS client
 */

var mongoose = require('mongoose');
var totalApps = 0;

// Set up MongoDB connection
//var mongoURI = 'mongodb://tyndallm:11526HHTx105@linus.mongohq.com:10084/appstore';
var mongoURI = 'mongodb://127.0.0.1:27017/appstore';
console.log('connecting to database on MongoHQ...');
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("succesfully connected to MongoHQ Appstore collection");
});

// App Schema
var appSchema = mongoose.Schema(
    { id: 'string', 
      name: 'string',
      description: 'string',
      client: 'string',
      platform: 'string',
      date: { type: Date, default: Date.now },
      icon_url: 'string' 
    });

var App = mongoose.model('App', appSchema);


// GET
exports.apps = function (req, res) {

	App.find(function (err, apps) {
	  if(err) {
      	return res.json({error: "Error fetching apps" });
	  }
	  else {
	  	totalApps = apps.length;
	    console.log("num of apps returned: ", totalApps);
	    res.json(apps);
	  }
	});

};

exports.app = function (req, res) {
	var appId = req.params.id;
	App.find({ id: appId }, function(err, app) {
		if(err) {
		  return res.json({error: "Error fetching app" });
		}
		else{
			res.json(app);
		}
	});

};

// POST
exports.addApp = function (req, res) {
	console.log(req.body);

	var newApp = new App(req.body);

	// We need to find the size so we can properly add the id
	if(totalApps === 0) {
		App.find(function (err, apps) {
		  if(err) {
	      	return res.json({error: "Error fetching total number of apps" });
		  }
		  else {
		  	totalApps = apps.length;
		  }
		});
	}

	console.log("totalApps: ", totalApps);

	newApp.id = totalApps + 1;
	console.log("newApp: ", newApp);
	newApp.save(function (err) {
	  if(err) {
		  return res.json({error: "Error saving app"});
	  } else {
	  	console.log("Success");
	  	res.json(newApp);
	  }
	  
	});
};

// PUT
exports.editApp = function (req, res) {
	var objectId = req.params.id;
	console.log(objectId);

	App.findOne({ _id: objectId }, function(err, app) {
		if(err) {
		  return res.json({error: "Error fetching app" });
		}
		else{

			app.name = req.body.name;
			app.description = req.body.description;
			app.client = req.body.client;
			app.platform = req.body.platform;
			app.icon_url = req.body.icon_url;
			app.save(function (err) {
				if(err) {
					return res.json({error: "Error saving app"});
				} else {
				    console.log("Success");
				}
		  
			});
			res.json(app);
		}
	});
}

// DELETE
exports.deleteApp = function (req, res) {
	var id = req.params.id;

	if(id >= 0 && id < data.apps.length) {
		data.apps.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};









