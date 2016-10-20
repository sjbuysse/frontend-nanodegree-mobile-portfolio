var ngrok = require('ngrok');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    //var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({ 
        responsive_images: {
            pizza:{
                options: {
                    engine: 'im',
                    sizes: [{
                            name: 'xsmall',
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
                    cwd: 'views/src/images/ToBeResized',
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'views/src/images/ToBeOptimized/'
                }]
            }
        },
        copy: {
          nonResponsiveImages: {
            expand: true,
            filter: 'isFile',
            flatten: true,
            src: 'views/src/images/*',
            dest: 'views/src/images/ToBeOptimized'
          },
          html: {
            expand: true,
            filter: 'isFile',
            flatten: true,
            src: 'views/src/*.{html}',
            dest: 'views/dist/'
          }
        },
        responsive_images_extender:{
            target: {
                options: {
                    ignore: ['.grunt-responsive-ignore'],
                    srcAttribute: 'none'
                },
                files: [{
                    expand: true,
                    src: ["*.{html,htm,php}"],
                    cwd: "views/dist",
                    dest: 'views/dist'
                }]
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'views/src/images/ToBeOptimized',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'views/dist/images/'                  // Destination path prefix
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

    grunt.registerTask('default', ['responsive_images', 'copy','newer:imagemin', 'responsive_images_extender']); 
};
