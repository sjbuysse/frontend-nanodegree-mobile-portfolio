var ngrok = require('ngrok');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    //var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({ 
        responsive_images: {
            pizza:{
                options: {
                    engine: 'im',
                    createNoScaledImage: true,
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
                            name: 'original',
                            rename: false,
                            width: '100%',
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
                    cwd: 'src/views/images/ToBeResized',
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'src/views/images/ToBeOptimized/'
                }]
            },
            projectPics:{
                options: {
                    engine: 'im',
                    createNoScaledImage: true,
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
                            name: 'original',
                            rename: false,
                            width: '100%',
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
                    cwd: 'src/img/ToBeResized',
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'src/img/ToBeOptimized/'
                }]
            }
        },
        copy: {
            cssAndJSAndHTML: {
                expand: true,
                filter: 'isFile',
                cwd: 'src/',
                src: '**/*.{html,css,js}',
                dest: 'dist/'
            }
        },
        responsive_images_extender:{
            target: {
                options: {
                    ignore: ['.grunt-responsive-ignore'],
                },
                files: [{
                    expand: true,
                    src: ["*.{html,htm,php}"],
                    cwd: "dist/views",
                    dest: 'dist/views'
                }]
            },
            otherones: {
                options: {
                    ignore: ['.grunt-responsive-ignore'],
                },
                files: [{
                    expand: true,
                    src: ["*.{html,htm,php}"],
                    cwd: "dist",
                    dest: 'dist'
                }]
            }
        },
        imagemin: {                          // Task
            pizza: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'src/views/images/ToBeOptimized/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'dist/views/images/'                  // Destination path prefix
              }]
            },
            target: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'src/img/ToBeOptimized/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'dist/img/'                  // Destination path prefix
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
    //grunt.registerTask('default', ['copy']); 
};
