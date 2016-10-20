var ngrok = require('ngrok');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    //var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({ 
        responsive_images: {
            target:{
                options: {
                    engine: 'im',
                    sizes: [{
                            name: 'xtra-small',
                            width: 100,
                            quality: 80
                          },{
                            name: 'small',
                            width: 320,
                            quality: 80
                          },{
                            name: 'medium',
                            width: 640,
                            quality: 80
                          },{
                            name: "large",
                            width: 800,
                            quality: 80
                          },{
                            name: "large",
                            width: 1600,
                            suffix: "_x2",
                            quality: 60
                          }]
                },
                files: [{
                    expand: true,
                    cwd: 'views/images/src',
                    src: ['*.{jpg,gif,png,jpeg}'],
                    dest: 'views/images/multiple-dimensions/'
                }]
            }
        },
        responsive_images_extender:{
            target: {
                options: {},
                files: [{
                    expand: true,
                    src: ["**/*.{html,htm,php}"],
                    cwd: "views/",
                    dest: 'dist/'
                }]
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'views/images/multiple-dimensions',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'views/images/dist/'                  // Destination path prefix
              }]
            }
        },
        pagespeed: { 
            options: { 
                nokey: true, 
                locale: "en_GB", 
                threshold: 40 
            }, 
            desktop: { 
                options: { 
                    strategy: "desktop" 
                } 
            }, 
            mobile: { 
                options: { 
                    strategy: "mobile" 
                } 
            } 
        } 
    }); 

    //Register custom task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() { 
        var done = this.async(); 
        var port = 8080;
        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
              }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });   
    });

    grunt.registerTask('default', ['responsive_images','newer:imagemin']); 
};
