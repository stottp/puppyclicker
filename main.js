/* ======= Model ======= */

var model = {
	currentPuppy: null,
	adminView: false, //is the form admin showing
	puppies: [
		{
			clickCount : 0,
			name : 'Baxter',
			imgSrc : 'img/puppy.jpg' 
		},
		{
			clickCount : 0,
			name : 'Max',
			imgSrc : 'img/puppy2.jpg' 
		},
		{
			clickCount : 0,
			name : 'Riley',
			imgSrc : 'img/puppy3.jpg' 
		},
		{
			clickCount : 0,
			name : 'Cooper',
			imgSrc : 'img/puppy4.jpg' 
		},
		{
			clickCount : 0,
			name : 'Oscar',
			imgSrc : 'img/puppy5.jpg' 
		},
	]
}

/* ======= Octopus ======= */

var octopus = {
	init: function() {
		// set initial puppy to be a random puppy in the list
		model.currentPuppy = model.puppies[Math.floor(Math.random()*model.puppies.length)];
		//model.currentPuppy = model.puppies[0];
		
		//initialise views
		puppyListView.init();
		puppyView.init();
		adminView.init();
	},
	
	getCurrentPuppy: function() {
		return model.currentPuppy;
	},
		
	getPuppies: function() {
		return model.puppies;
	},
	
	// set the current puppy to the object passed in
	setCurrentPuppy: function(puppy) {
		model.currentPuppy = puppy;
	},
	
	//increment counter of puppy
	incrementCounter: function() {
		model.currentPuppy.clickCount++;
		puppyView.render();
	},
	
	//get model admin view
	getCurrentAdmin: function() {
		return model.adminView;
	},
	
	//set puppies from form
	setCurrentPuppy: function(aname) {
		console.log(aname);
	},
	
	//Toggle admin area
	toggleAdminArea: function() {
		if (model.adminView === false) {
			model.adminView = true
		} else { (model.adminView === true) 
			model.adminView = false;
		}
		adminView.render();
	}
		
};


/* ======= view ======= */

var puppyView = {
	
	init: function() {
		//store Dom Elements
		this.puppyElem = document.getElementById('puppy');
		this.puppyNameElem = document.getElementById('puppy-name');
		this.puppyImageElem = document.getElementById('puppy-img');
		this.countElem = document.getElementById('puppy-count');
		
		this.adminBtnElem = document.getElementById('admin-btn');
		this.adminElem = document.getElementById('admin-area');
		
		//on click increment puppy counter
		this.puppyImageElem.addEventListener('click', function(e) {
			octopus.incrementCounter();
		});
		
		//render the update
		this.render();
	},
	
	render: function() {
		var currentPuppy = octopus.getCurrentPuppy();
		this.countElem.textContent = currentPuppy.clickCount;
		this.puppyNameElem.textContent = currentPuppy.name;
		this.puppyImageElem.src = currentPuppy.imgSrc;
	}
};

var puppyListView = {
	
	init: function() {
		//store Dom elements for later
		this.puppyListElem = document.getElementById('puppy-list');
		
		// render this view
		this.render();
	},
	
	render: function() {
		// get the puppies we'll be rendering from the octopus
		var puppies = octopus.getPuppies();
		
		//empty the puppy list
		this.puppyListElem.innerHTML = '';
		
		// loop over the puppies
		for (var i = 0; i < puppies.length; i++) {
			//current puppy
			var puppy = puppies[i];
			
			//make a new puppy list and set its text
			var elem = document.createElement('li');
			elem.textContent = puppy.name;
			
			// on click, setCurrentPuppy and render the puppyView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the puppy variable to the click event function)
            elem.addEventListener('click', (function(puppy) {
                return function() {
                    octopus.setCurrentPuppy(puppy);
                    puppyView.render();
                };
            })(puppy));

            // finally, add the element to the list
            this.puppyListElem.appendChild(elem);
		};
	}
};
	

	var adminView = {
	
		init: function() {
			//store Dom Elements
			this.adminBtnElem = document.getElementById('admin-btn');
			this.adminElem = document.getElementById('admin-area');
			this.adminBtnSaveElem = document.getElementById('save');
			this.adminBtnCancelElem = document.getElementById('cancel');
			this.puppyName = document.getElementById('puppy-name');
			this.imgURL = document.getElementById('imgURL');
			this.clicks = document.getElementById('clicks');
			
			//on click toggle the form
			this.adminBtnElem.addEventListener('click', function(e) {
				octopus.toggleAdminArea();
			})
			
			//Cancel the form
			this.adminBtnCancelElem.addEventListener('click', function(e) {
				octopus.toggleAdminArea();
			})
			
			//save the form
			this.adminBtnSaveElem.addEventListener('click', function(e) {
				console.log(puppytest);
			})
			
			//render
			this.render();
		},
		
		render: function() {
			var getCurrentAdmin = octopus.getCurrentAdmin();
			this.puppyNameVal = document.getElementById('puppy-name-text').value;
			console.log(puppyNameVal);
			
			
			if (getCurrentAdmin === false) {
				this.adminElem.style.visibility = 'hidden';
			} else { (getCurrentAdmin === true) 
				this.adminElem.style.visibility = 'visible';
			}
		}
};

//run it!
octopus.init();