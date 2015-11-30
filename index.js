var glob = require('glob')
var Vector = require('three').Vector3
var Euler = require('three').Euler

var p = new Vector(0, 1.5, 0)
var s = new Vector(3, 3, 0.2)
var r = new Euler(0, 0, 0)
var xml = '<scene>\n'

xml += '\t<spawn position="0 0 2" />\n'
xml += '\t<skybox style="color: linear-gradient(#fff, #acf)" />\n'

function V (vector) {
  return vector.toArray().join(' ')
}

var inc = 0.1

glob('./slides/*.png', function (err, slides) {
  if (err) {
    throw err
  }

  slides.forEach(function (slide) {
    xml += '\t<billboard position="' + V(p) + '" scale="' + V(s) + '" rotation="' + V(r) + '"><![CDATA[\n\t\t<img style="width: 480px; margin-top: 40px" src="' + slide + '" />\n\t]]></billboard>\n\n'

    var m = new Vector(4, 0, 0).applyEuler(r)
    p.add(m)
    r.y -= inc
  })

  xml += '</scene>'

  console.log(xml)
})
