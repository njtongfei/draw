/**
 * Created by Hexl on 2015/9/22.
 */
(function() {
    'use strict';

    function PaperPreviewService() {
        return {
            showPaper: function(paperUrl) {
                var $paperArea = $('#paper-pdf-area #pdf-container');
                if (paperUrl) {
                    $('#paper-pdf-area').show();
                    //var paperUrl = './helloworld.pdf';
                    PDFJS.getDocument("http://" + paperUrl).then(function getPdfHelloWorld(pdf) {
                        pdf.getPage(1).then(function getPageHelloWorld(page) {
                            var scale = 1;
                            var viewport = page.getViewport(scale);
                            console.error(viewport);
                            console.error(page.getViewport(1.5));
                            var canvas = document.getElementById('pdf-container');
                            var context = canvas.getContext('2d');
                            var renderCanvas = function(height, width) {
                                canvas.height = $(window).height();
                                canvas.width = width;
                                var renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };
                                page.render(renderContext);
                            };
                            renderCanvas(viewport.height, viewport.width);
                            var mcIn = new Hammer(canvas);
                            mcIn.add(new Hammer.Pinch());
                            //添加事件
                            mcIn.on("pinchin", function(e) {
                                //控制台输出
                                console.log(e);
                                if (scale > 1) {
                                    scale -= 0.5;
                                    viewport = page.getViewport(scale);
                                    renderCanvas(viewport.height, viewport.width);
                                }
                            });
                            var mcOut = new Hammer(canvas);
                            mcOut.add(new Hammer.Pinch());
                            //添加事件
                            mcOut.on("pinchout", function(e) {
                                //控制台输出
                                console.log(e);
                                if (scale <= 3) {
                                    scale += 0.5;
                                    viewport = page.getViewport(scale);
                                    renderCanvas(viewport.height, viewport.width);
                                }
                            });
                        });
                    });
                } else {
                    alert('没有找到相应试卷！')
                }
            }
        };
    }

    angular.module('common.services.paperPreview', [])
        .factory('PaperPreviewService', PaperPreviewService);
})();