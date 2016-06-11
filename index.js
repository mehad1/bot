'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a new bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		let iftar = "iftar"
		let discount = "discount"
		let offerbot = "offerbot"
		let buy = "buy"
		let get1 = "get"
		let help = "help"
		let website = "website"
		
		if (event.message && event.message.text) {
			let text = event.message.text
			let match = text.toLowerCase()
			
			
			if (match.indexOf(iftar) >= 0) {
			          sendTextMessage(sender, "help is here")
			          continue
			}
		
			else if (match.indexOf(help) >= 0) {
			          sendTextMessage(sender, "help is here")
			          continue
			}
			
			

			else if (match.indexOf(discount) >= 0 && match.indexOf(offerbot) < 0) {
			          sendTextMessage(sender, "best dicounts are here")
			          continue
			}
			
			else if (match.indexOf(buy) >= 0 && match.indexOf(get1) >= 0) {
				sendTextMessage(sender, "buy1 & get1 is here")
				continue
			}
			
   			else if (match.indexOf(offerbot) >= 0 && match.indexOf(discount) >= 0) {
			          sendTextMessage(sender, "offerbot discounts are here")
			          continue
			}
			
			
			
			sendTextMessage(sender,"Hello! I am Offerbot \nI'm here to guide you for the best dining expreience in the city. I'll show you the best deals and reviews to provide you the satisfation you deserve.")
			welcomeMessage2(sender)
			welcomeMessage3(sender)
			}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			if (text === '{"payload":"12"}') {
			sendTextMessage(sender, "Postback received1: ", token)
			sendTextMessage(sender, "Postback received2: ")
			continue
			}
			sendTextMessage(sender, "Postback received3: "+text.substring(0, 200), token)
		}
	}
	res.sendStatus(200)
})


const token = "EAABglJwRT9kBAEk6JS8xmrUXqHSN1MOOcBeZB4gmhVcrYbT0nZBVtr63FkyZAOCEbcPrDfPm0ZAWTKUVBqoO5iwEZAl4L1UNtmEScWZBVTPaZBE30mVVZCj1RkZCvYMFPfovZA6vOi2zHr5i2QKTpBRboOXnbqeA5n11ZAliPSua95xnAZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendButtonMessage(sender) {
  let messageData = {

      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "This is test text",
          "buttons":[{
            "type": "web_url",
            "url": "https://www.oculus.com/en-us/rift/",
            "title": "Open Web URL"
          }, {
            "type": "postback",
            "title": "Call Postback",
            "payload": "12"

          }]
        }
      }
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }

function sendImageMessage(sender) {
  let messageData = {

      "attachment": {
        "type": "image",
        "payload": {
          "url": "http://i.imgur.com/zYIlgBl.png"
        }
      }
    }
    request({
  		url: 'https://graph.facebook.com/v2.6/me/messages',
  		qs: {access_token:token},
  		method: 'POST',
  		json: {
  			recipient: {id:sender},
  			message: messageData,
  		}
  	}, function(error, response, body) {
  		if (error) {
  			console.log('Error sending messages: ', error)
  		} else if (response.body.error) {
  			console.log('Error: ', response.body.error)
  		}
  	})
  }


function iftarMessage(sender) {
  let messageData = {

      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            
            "title": "The Westin",
            "subtitle": "Rate: 5/5",
            //"item_url": "https://www.oculus.com/en-us/rift/",
            "image_url": "http://i.imgur.com/rmgOfcV.jpg",

            "buttons": [{

              "type": "web_url",
              "url": "https://www.oculus.com/en-us/rift/",
              "title": "Go to Webpage"
            }, {
              
              "type": "postback",
              "title": "Reservation",
              "payload": "reserve",
            }, {
              
              "type": "postback",
              "title": "See More",
              "payload": "westin",
            }],
          }, 

          {
          "title": "Amari",
          "subtitle": "Rate: 5/5",
        //  "item_url": "https://www.oculus.com/en-us/rift/",
          "image_url": "http://i.imgur.com/4IBS57N.jpg",
          
          "buttons": [{
          
            "type": "web_url",
            "url": "https://www.oculus.com/en-us/rift/",
            "title": "Go to Webpage"
          }, {

            "type": "postback",
            "title": "Reservation",
            "payload": "reserve",
          }, {
            
            "type": "postback",
            "title": "See More",
            "payload": "amari",
          }],
          }, 

          {
          "title": "MOKA Bistro",
          "subtitle": "Rate: 5/5",
          //"item_url": "https://www.oculus.com/en-us/rift/",
          "image_url": "http://i.imgur.com/QtmX7Yc.jpg",
          
          "buttons": [{
          
            "type": "web_url",
            "url": "https://www.oculus.com/en-us/rift/",
            "title": "Go to Webpage"
          }, {

            "type": "postback",
            "title": "Reservation",
            "payload": "reserve",
          }, {
            
            "type": "postback",
            "title": "See More",
            "payload": "moka",
          }],
          }, 

          {
          "title": "Watercress Restaurant",
          "subtitle": "Rate: 5/5",
          //"item_url": "https://www.oculus.com/en-us/rift/",
          "image_url": "http://i.imgur.com/myWalGX.jpg",
          
          "buttons": [{
          
            "type": "web_url",
            "url": "https://www.oculus.com/en-us/rift/",
            "title": "Go to Webpage"
          }, {

            "type": "postback",
            "title": "Reservation",
            "payload": "reserve",
          }, {
            
            "type": "postback",
            "title": "See More",
            "payload": "water",
          }],
          }, 

          {
            "title": "The Glasshouse Brassiere",
            "subtitle": "Rate: 5/5",
          //  "item_url": "https://www.oculus.com/en-us/rift/",
            "image_url": "http://i.imgur.com/lkq6JdE.jpg",
            
            "buttons": [{
            
              "type": "web_url",
              "url": "https://www.oculus.com/en-us/rift/",
              "title": "Go to Webpage"
            }, {

              "type": "postback",
              "title": "Reservation",
              "payload": "reserve",
            }, {
              
              "type": "postback",
              "title": "See More",
              "payload": "glass",
            }]
          }]
        }
      }
    }
    request({
  		url: 'https://graph.facebook.com/v2.6/me/messages',
  		qs: {access_token:token},
  		method: 'POST',
  		json: {
  			recipient: {id:sender},
  			message: messageData,
  		}
  	}, function(error, response, body) {
  		if (error) {
  			console.log('Error sending messages: ', error)
  		} else if (response.body.error) {
  			console.log('Error: ', response.body.error)
  		}
  	})
  }




function welcomeMessage2(sender) {
  let messageData = {

      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "You can simply ask by typing",
          
          "buttons":[{
            
	      "type": "postback",
	      "title": "Best iftar in Dhaka",
	      "payload": "1.1"
	}, {
		"type": "postback",
		"title": "Best Discount offer",
		"payload": "1.2"
	}, {
		"type": "postback",
		"title": "Buy 1 & Get 1 Offer",
		"payload": "1.3"
		
          }]
        }
      }
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }

function welcomeMessage3(sender) {
  let messageData = {

      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "You can ask by clicking the buttons",

          "buttons":[{

		"type": "postback",
		"title": "Offerbot Discounts",
		"payload": "1.4"
          }, {
            "type": "web_url",
            "url": "https://www.oculus.com/en-us/rift/",
            "title": "Visit Website"
          }, {
            "type": "postback",
            "title": "Help",
            "payload": "1.6"
          

          }]
        }
      }
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }




// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
