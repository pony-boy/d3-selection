var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3 = require("../../");

tape("selection.remove() removes selected elements from their parent", function(test) {
  var document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      selection = d3.selectAll([two, one]);
  test.equal(selection.remove(), selection);
  test.equal(one.parentNode, null);
  test.equal(two.parentNode, null);
  test.end();
});

tape("selection.remove() skips elements that have already been detached", function(test) {
  var document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      selection = d3.selectAll([two, one]);
  one.parentNode.removeChild(one);
  test.equal(selection.remove(), selection);
  test.equal(one.parentNode, null);
  test.equal(two.parentNode, null);
  test.end();
});

tape("selection.remove() skips missing elements", function(test) {
  var document = jsdom("<h1 id='one'></h1><h1 id='two'></h1>"),
      one = document.querySelector("#one"),
      two = document.querySelector("#two"),
      selection = d3.selectAll([, one]);
  test.equal(selection.remove(), selection);
  test.equal(one.parentNode, null);
  test.equal(two.parentNode, document.body);
  test.end();
});

tape("selectChildren().remove() removes all children", function(test) {
  var document = jsdom("<div><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>"),
      p = document.querySelector("div"),
      selection = d3.select(p).selectChildren();
  test.equal(selection.size(), 10);
  test.equal(selection.remove(), selection);
  test.equal(d3.select(p).selectChildren().size(), 0);
  test.end();
});
