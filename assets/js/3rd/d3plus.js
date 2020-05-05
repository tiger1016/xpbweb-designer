var d3plus = {};

d3plus.textwrap = function() {
    
    var _resize = false;            // Should the text be resized in the container?
    var _wrap = false;              // Should the text be wrapped in the container?
    var _textElement;               // Represents the text element that will have the wrapping applied

    var _x;                         // The offset x-position
    var _y;                         // The offset y-position
    var _width;                     // The maximum width that should be afforded for text rendering
    var _height;                    // The maximum height that should be afforded for text rendering
    var _dy;


    var _alignment = "center";
    
    
    var _rotate = 0;
    
    var _size;
    
    var _valign = null;
    
    var _innerHeight;
    var _innerWidth;
    
    var _padding = 0;
    

    function fontSizes(vars, maxSize) {

        var sizes = [];
        var svg = d3.select("body").append("svg");

        var tspans = svg.append("text")
            .selectAll("tspan")
            .data(vars.words)
            .enter()
            .append("tspan")
            .attr("left", "0px")
            .attr("position", "absolute")
            .attr("top", "0px")
            .attr("x", 0)
            .attr("y", 0)
            .attr("font-size", maxSize + "px")
            .text(function(d) {
                return d;
            })
            .each(function(d) {
              
                var width = this.getComputedTextLength();   
                var height = this.offsetHeight || this.getBoundingClientRect().height || this.parentNode.getBBox().height;
                          
                var children = d3.select(this).selectAll("tspan");
                if (children.size()) {
                    alert("didn't expect to get here");
                } 
                
                return sizes.push({
                    height: height,
                    width: width,
                    text: d
                });
            });

        tspans.remove();
        svg.remove();
        return sizes;
    }

    function parse(vars) {
      
        vars.container.x = _x || parseFloat(vars.element.attr("x"), 10) || 0;
        vars.container.y = _y || parseFloat(vars.element.attr("y"), 10) || 0;

        if (vars.shape === "rect") {

            var x = parseFloat(vars.container.attr("x"), 10) || 0;
            var y = parseFloat(vars.container.attr("y"), 10) || 0;
            var width = parseFloat(vars.container.attr("width") || vars.container.style("width"), 10);
            var height = parseFloat(vars.container.attr("height") || vars.container.style("height"), 10);
            var diff = Math.abs(x - vars.container.x);

        } else if (vars.shape === "circle") {

            var x = parseFloat(vars.container.attr("cx"), 10) || 0;
            var y = parseFloat(vars.container.attr("cy"), 10) || 0;
            var diff = Math.abs(x - vars.container.x);
            var r = parseFloat(vars.container.attr("r"), 10) || 0;
            var width = r * 2;
            var height = width;
            x -= r;
            y -= r;

        }

        vars.x = _x || x;
        vars.y = _y || y;
        vars.padding = _padding || diff;
        vars.height = _height || height;
        vars.width = _width || width;
        vars.innerHeight = vars.height - (2 * _padding);
        vars.innerWidth = vars.width - (2 * _padding);
        vars.rotate = _rotate;

        vars.fontSize = parseFloat(vars.element.attr("font-size") || vars.element.attr("font-size"), 10);
        vars.container.dy = _dy;
        vars.size = _size || _resize ? [4, 80] : [vars.fontSize / 2, vars.fontSize];

        if (_padding) {
            vars.container.x = x + _padding;
            vars.container.y = y + _padding;
        }


        vars.align = _alignment || 'center';
        vars.valign = _valign || 'middle';
    }

    function resize(vars) {
      
        for (var i = 0; i < vars.words.length - 1; i++) {
            vars.words[i] = vars.words[i] + " ";
        }

        var sizeMax = Math.floor(vars.size[1]);
        vars.container.dy = 0;
        var lineWidth = vars.shape === "circle" ? vars.width * 0.75 : vars.width;
        var sizes = fontSizes(vars, sizeMax);
        var maxWidth = d3.max(sizes, function(d) {
            return d.width;
        });

        var areaMod = 1.165 + (vars.width / vars.height * 0.11);
        var textArea = d3.sum(sizes, function(d) {
            h = vars.dy || sizeMax * 1.2;
            return d.width * h;
        }) * areaMod;

        if (vars.shape === "circle") {
            var boxArea = Math.PI * Math.pow(vars.width / 2, 2);
        } else {
            var boxArea = lineWidth * vars.height;
        }

        if (maxWidth > lineWidth || textArea > boxArea) {
            var areaRatio = Math.sqrt(boxArea / textArea);
            var widthRatio = lineWidth / maxWidth;
            var sizeRatio = d3.min([areaRatio, widthRatio]);
            var sizeMax = d3.max([vars.size[0], Math.floor(sizeMax * sizeRatio)]);
        }

        var heightMax = Math.floor(vars.height * 0.8);
        if (sizeMax > heightMax) {
            sizeMax = heightMax;
        }

        if (maxWidth * (sizeMax / vars.size[1]) <= lineWidth) {
            if (sizeMax !== vars.size[1]) {
                vars.size = [vars.size[0], sizeMax];
            }
            flow(vars);
        } else {
            //wrap(vars);
        }
    }

    function flow(vars) {
        var dx;
        var vAlign = _valign || "top";
        var anchor;
        var yOffset = 0;
        var fontSize = _resize ? vars.size[1] - 1 : vars.fontSize - 2 || vars.size[0];
        var dy = _resize ? vars.container.dy || fontSize * 1.1 : vars.container.dy || fontSize * 1.3;
        var x = vars.container.x;
        var dx = vars.container.dx || 0;
        var height = vars.innerHeight;
        var width = vars.innerWidth;
        var textBox;
        var reverse = false;

        var newLine = function(word, first) {
            if (!word) {
                word = "";
            }

            return vars.element
                .append("tspan")
                .attr("x", x + "px")
                .attr("dx", dx + "px")
                .attr("dy", dy + "px")
                .style("baseline-shift", "0%")
                .attr("dominant-baseline", "alphabetic")
                .text(word);
        };


        if (vars.shape === "circle") {
            anchor = "middle";
            if (vAlign === "middle") {
                yOffset = ((height / dy % 1) * dy) / 2;
            } else if(vAlign === "end") {
                yOffset = (height / dy % 1) * dy;
            }
        } else {
            anchor = vars.align || vars.container.align || "start";
        }

        vars.element.attr("text-anchor", anchor)
                      .attr("font-size", fontSize + "px")
                      .attr("x", vars.container.x)
                      .attr("y", vars.container.y);

        switch (anchor) {
            case "middle":
                dx = vars.width / 2;
                break;
            case "end":
                dx = vars.width;
                break;
            default:
                dx = 0;
                break;
        }


        vars.container.attr("text-anchor", anchor)
            .attr("font-size", fontSize + "px")
            .attr("x", vars.container.x)
            .attr("y", vars.container.y);

        truncate = function() {
            textBox.remove();
            if (reverse) {
                line++;
                textBox = vars.container.select("tspan");
            } else {
                line--;
                textBox = d3.select(vars.container.node().lastChild);
            }
            if (!textBox.empty()) {
                words = textBox.text().match(/[^\s-]+-?/g);
                return ellipsis();
            }
        };

        lineWidth = function() {
            var b;
            if (vars.shape === "circle") {
                b = ((line - 1) * dy) + yOffset;
                if (b > height / 2) {
                    b += dy;
                }
                return 2 * Math.sqrt(b * ((2 * (width / 2)) - b));
            } else {
                return width;
            }
        };

        ellipsis = function() {
            var lastChar, lastWord;
            if (words && words.length) {
                lastWord = words.pop();
                lastChar = lastWord.charAt(lastWord.length - 1);
                if (lastWord.length === 1 && vars.text.split.value.indexOf(lastWord) >= 0) {
                    return ellipsis();
                } else {
                    if (vars.text.split.value.indexOf(lastChar) >= 0) {
                        lastWord = lastWord.substr(0, lastWord.length - 1);
                    }
                    textBox.text(words.join(" ") + " " + lastWord + "...");
                    if (textBox.node().getComputedTextLength() > lineWidth()) {
                        return ellipsis();
                    }
                }
            } else {
                return truncate();
            }
        };

        placeWord = function(word) {
            var current, joiner, next_char;
            var first = true;
            current = textBox.text();
            if (reverse) {
                next_char = vars.text.charAt(vars.text.length - progress.length - 1);
                joiner = next_char === " " ? " " : "";
                progress = word + joiner + progress;
                textBox.text(word + joiner + current);
            } else {
                if (first) {
                    first = false;
                    var temp = vars.text.substr(0, progress.length);
                    if (temp[progress.length - 1] === '\n') progress = progress.substr(0, progress.length - 1);
                }
                next_char = vars.text.charAt(progress.length);
                joiner = next_char === " " ? " " : "";
                if (next_char === '\n') {
                    textBox.text(current);
                    textBox = newLine(word);
                    progress += next_char + word;
                    line++;
                } else {
                    progress += joiner + word;
                    textBox.text(current + joiner + word);
                }
            }
            if (textBox.node().getComputedTextLength() > lineWidth() && next_char !== '\n') {
                textBox.text(current);
                textBox = newLine(word);
                if (reverse) {
                    return line--;
                } else {
                    return line++;
                }
            }
        };

        var start = 1;
        var line = null;
        var lines = null;
        var wrap = function() {
            vars.container.selectAll("tspan").remove();
            vars.container.html("");

            var word = null;
            var words = vars.words.slice(0);

            if (_resize) {
                if (words[0][words[0].length - 1] === '\n') progress = words[0].substr(0, words[0].length - 1);
               else progress = words[0];
            } else {
                if (words[0][words[0].length - 1] === '\n') progress = words[0].substr(0, words[0].length - 1);
                progress = words[0];
            }
            textBox = newLine(words.shift(), true);
            line = start;
            var len = words.length;
            for (var i = 0; i < len; i++) {

                word = words[i];
                if (line * dy > height) {
                    truncate();
                    break;
                }
                placeWord(word);
                var unsafe = true;
                while (unsafe) {
                    var next_char = vars.text.charAt(progress.length + 1);
                    unsafe = ["@"].indexOf(next_char) >= 0;
                    if (unsafe) {
                        placeWord(next_char);
                    }
                }
            }

            if (line * dy > height) {
                truncate();
            }

            return lines = Math.abs(line - start) + 1;
        };

        wrap();

        lines = line;
        if (vars.shape.value === "circle") {
            space = height - lines * dy;
            if (space > dy) {
                if (valign === "middle") {
                    start = (space / dy / 2 >> 0) + 1;
                    wrap();
                } else if (valign === "bottom") {
                    reverse = true;
                    start = height / dy >> 0;
                    wrap();
                }
            }
        }
        var y;
        if (vAlign === "top") {
            y = 0;
        } else {
            h = lines * dy;
            y = vAlign === "middle" ? height / 2 - h / 2 : height - h;
        }
        y -= dy * 0.25;

        vars.element.select('tspan').attr('y', y + 'px');
      
        return vars.container;
    }

    this.draw = function() {

        if (!_textElement) return this;

        _textElement.each(function(d) {

            var vars = {};
            vars.element = d3.select(this);

            var container = vars.element.node().previousElementSibling;
            vars.shape = container ? container.tagName.toLowerCase() : "";
            vars.container = d3.select(container);

            parse(vars);

            var wordBreak = /[^\s\n]+/g;
            vars.text = vars.element.text();
            //console.log(vars.text)
            vars.words = vars.text.match(wordBreak);
            //console.log(vars.words)

            vars.element.html("");

            if (_resize) {
                resize(vars);
            } else {
                flow(vars);
            }

            return;
        });

        return this;
    };

    this.align = function(_) {
        if (!arguments.length) return _alignment;

        switch (_) {
            case "center":
                _ = "middle";
                break;
            case "right":
                _ = "end";
                break;
            case "left":
                _ = "start";
                break;
        }

        _alignment = _;
        return this;
    };

    this.config = function(_) {

        if (!arguments.length) return {
            alignment: _alignment,
            container: _textElement,
            resize: _resize,
            rotate: _rotate,
            fontSizeRange: _fontSizeRange,
            valign: _valign,
            height: _height,
            width: _width,
            padding: _padding,
            x: _x,
            y: _y,
            wrap: _wrap
        };

        for (var property in _) {
            if (_.hasOwnProperty(property)) {
                if(this[property]) {
                    this[property](_[property]);
                }
            }
        }

        return this;
    };

    this.container = function(_) {
        if (!arguments.length) return _textElement;
        _textElement = _;
        return this;
    };

    this.height = function(_) {
        if (!arguments.length) return _height;
        _height = _;
        return this;
    };

    this.padding = function(_) {
        if (!arguments.length) return _padding;
        _padding = _;
        return this;
    };

    this.resize = function(_) {
        if (!arguments.length) return _resize;
        _resize = _;
        return this;
    };

    this.wrap = function(_) {
        if (!arguments.length) return _wrap;
        _wrap = _;
        return this;
    };

    this.rotate = function(_) {
        if (!arguments.length) return _rotate;
        _rotate = _;
        return this;
    };

    this.fontSizeRange = function(_) {
        if (!arguments.length) return _fontSizeRange;
        _fontSizeRange = _;
        return this;
    };

    this.valign = function(_) {
        if (!arguments.length) return _valign;
        _valign = _;
        return this;
    };

    this.width = function(_) {
        if (!arguments.length) return _width;
        _width = _;
        return this;
    };

    this.x = function(_) {
        if (!arguments.length) return _x;
        _x = _;
        return this;
    };

    this.y = function(_) {
        if (!arguments.length) return _y;
        _y = _;
        return this;
    };

    this.lineHeight = function(_) {
        if (!arguments.length) return _dy;
        if (_ === NaN || _ === null) {
            _dy = 0;
        }
        _dy = _;
        return this;
    };

    return this;
};