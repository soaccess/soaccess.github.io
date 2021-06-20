Vue.use(Vuetify, {
  iconfont: 'mdi'
});
var app = new Vue({
	el: "#app",
	vuetify: new Vuetify(),
	data: {
		text: {
		},
		currentView: "enterUsername",
		inputUsername: "",
    inputEmail: "",
		currentCaptcha: "",
    show: true,
    calculating: false,
    usernameValid: false,
    emailValid: false,
    segWasIschDiPrice: 0.0008,
    address: "bc1q49pj5q20uqcsh4gsrp0adrlzwsnuqewtkr7ndw",
    countdown: 0,
    minutes: 10,
    seconds: 0,
    timeLeft: 100,
    interval: null,
    timePercentage: 100,
    orderId: null
	},

	created: function() {
    //this.$refs.usernameInput.focus();
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
      this.segWasIschDiPrice = parseFloat(30 / response.data.bpi.USD.rate_float).toFixed(10);
      this.orderId = `#${(this.segWasIschDiPrice + "").split(".")[1]}`;
    });
    this.currentView = 'enterUsername';
	},

	methods: {
    submitHeight: function() {
      this.calculating = true;
      this.currentView = "result";
      setTimeout(() => {
        this.calculating = false;
      }, 1400)
    },
    
    validateEmail: function() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.inputEmail)) {
          this.emailValid = true;
      } else {
          this.emailValid = false;
      }
    },
  
   runCountdown: function() {
    this.tenMinCountdown = new Date(new Date().getTime() + 10 * 60000 - 1000);
     
     // Get today's date and time
     var now = new Date().getTime();
        
     // Find the distance between now and the count down date
     var distance = this.tenMinCountdown - now;
     var intialDistance = distance;
       
     // Time calculations for days, hours, minutes and seconds
     this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
     if (this.interval) {
      window.clearInterval(this.interval);
     }
      this.interval = window.setInterval(() => {

      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = this.tenMinCountdown - now;
        
      // Time calculations for days, hours, minutes and seconds
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.timePercentage = ((distance / intialDistance) * 100).toFixed(2);
      if (this.seconds.toString().length < 2) {
        this.seconds = `0${this.seconds.toString()}`;
      }
      if (this.minutes === '00') {
        this.currentView = 'enterUsername';
        this.inputEmail = '';
        this.inputUsername = '';
        this.emailValid = false;
      }
    }, 1000);
  },
  
  copy: function() {
    console.log('test')
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = this.address;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  },

  submit: function() {
      this.currentView = 'loading';
      setTimeout(() => { this.currentView = 'payment'; this.runCountdown(); }, 3900);
    }
	}
});
