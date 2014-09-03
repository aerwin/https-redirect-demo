https-redirect-demo
===================

Simple Node.js application demonstrating how to ensure all `http` traffic is redirected to `https` when running on a Platform-as-a-Service (PaaS) like for [IBM Bluemix](http://www.bluemix.net). While this app has been tested only on Bluemix, it should also run anywhere the app is sitting behind a reverse proxy. In particular, since Bluemix is built on top of the [Cloud Foundry](http://www.cloudfoundry.org) open source framework, I'd expect the code to run in any other Cloud Foundry-based environment without change.

The code makes use of the [Express](http://expressjs.com/) web application framework. The key components of the solution are:

* Enabling [`trust proxy`](http://expressjs.com/api#app-settings) to turn on reverse proxy support
* Using [`req.secure`](http://expressjs.com/api#req.secure) to determine if `http` or `https` was requested
	* NOTE: `req.secure` provides a shortcut to doing a string compare against [`req.protocol`](http://expressjs.com/api#req.protocol), which is set by Express based on the `X-Forwarded-Proto` request header

A live version of `https-redirect-demo` is running on Bluemix here: [http://redirect-demo.mybluemix.net/](http://redirect-demo.mybluemix.net/)

Other Approaches
================
A "long hand" approach to this problem which manually inspects the `X-Forwarded-Proto` request header is available in the following blog by IBM colleague [Jeff Sloyer](https://twitter.com/jsloyer): 

* [*Inbound SSL in Bluemix*](https://developer.ibm.com/bluemix/2014/08/18/inbound-ssl-bluemix/)

Running on Bluemix
===================

Prerequisites
-------------
Before installing the code to Bluemix you will need to:

1.  Register for an account at [www.bluemix.net](https://www.bluemix.net). If you don't already have an account you can register for a free trial without a credit card.
2.  Install the `cf` command line tool: https://github.com/cloudfoundry/cli/releases

Get the Code
------------
Next, you need to get the code onto your machine. You have two main options:

* Use the zip archive for this repository:
	1. Download [master.zip](https://github.com/aerwin/https-redirect-demo/archive/master.zip)
	2. Extract to the directory of your choice which should create a directory called `https-redirect-demo-master`
	3. Run `cd https-redirect-demo-master`

OR

* Use `git clone` from the command line:
	1. `cd` to the parent directory you want to install the project in 
	2. Run `git clone https://github.com/aerwin/https-redirect-demo.git`
	3. Run `cd https-redirect-demo/`


Log Into Bluemix
----------------
If you are not logged into Bluemix, then you should do the following from the command line:

1. Set the `cf` target: `cf api https://api.ng.bluemix.net`
2. Log into Bluemix: `cf login`

Push the Code
-------------
Now that you are logged in, you should be able to push your code to Bluemix by simply running:

	cf push

You should then see a bunch of console output that eventually ends with something like the what is shown below. NOTE: the string `${random-word}` was included as a placeholder in the `manifest.yml` file so that a unique route (or URL) would be created for your app. So, where you see `${random-word}` in the output, you will actually see a randomly chosen word.

	Showing health and status for app https-redirect-demo in org 	aerwin@us.ibm.com / space test as aerwin@us.ibm.com...
	OK

	requested state: started
	instances: 1/1
	usage: 128M x 1 instances
	urls: redirect-demo-${random-word}.mybluemix.net

     state     since                    cpu    memory          disk   
	#0   running   2014-09-02 03:19:59 PM   0.0%   15.7M of 128M   25.1M of 1G 

After the successful push, you should be able to run your app by pointing your browser at either:

	https://redirect-demo-${random-word}.mybluemix.net/
	https://redirect-demo-${random-word}.mybluemix.net/

And, if you use `http`, then you will be redirected `https`.

License
===================
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
