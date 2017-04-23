if (Meteor.isClient) {
    // Setup routing.
    Router.configure({
    	layoutTemplate: 'navbar'
    });
    
    Router.route('/new', function (){
    	this.render('newDraw')
 	}); 
}