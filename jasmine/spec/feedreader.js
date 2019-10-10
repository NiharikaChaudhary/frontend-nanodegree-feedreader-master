/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*   Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Has a URL defined and not empty', function() {
            allFeeds.forEach(function(link) {
                expect(link.url).toBeDefined();
                expect(link.url.length).not.toBe(0);
            });
        });

        /*   Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Has a name defined and not empty', function() {
            allFeeds.forEach(function(title) {
                expect(title.name).toBeDefined();
                expect(title.name.length).not.toBe(0);
            });
        });

    });
    /*   Write a new test suite named "The menu" */

    describe('The menu', function() {
        /*   Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('Has a menu element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /*   Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Has Display/hide visibility of menu element on click', function() {
            $('.menu-icon-link').click(); //to show menu element
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            $('.menu-icon-link').click(); //to hide menu element
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });




    /*   Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        //as loadFeed() is asynchronous therefore use of beforeEach and done() function is mandatory
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('Has atleast single entry in feed', function() {
            expect($('.feed .entry').length).not.toBe(0); //confirms that there is one or more than one entry in the fee container

        });

    });
    /*   Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    /*  Write a new test suite named "New Feed Selection" */

    /*   Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {
        // it is better to declare variables in the parent scope 
        var feed, //this is the old feed 
            recentFeed; //this is a new feed
        //as loadFeed() is asynchronous therefore use of beforeEach and done() function is mandatory
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed = $('.feed').html();
                loadFeed(1, function() {
                    recentFeed = $('.feed').html();
                    done();
                });

            });

        });

        it('changes content when new feed is loaded', function(done) {
            expect(feed).not.toEqual(recentFeed);
            /*it says that old feed should not be equal to new feed.
                       Therefore, confirms content changes with every new feed*/
            done(); //invoking done function
        });

    });




}());