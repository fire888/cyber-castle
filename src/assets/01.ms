fn drawLineBetweenTwoPoints pointA pointB =
(
  ss = SplineShape pos:pointA
  addNewSpline ss
  addKnot ss 1 #corner #line PointA
  addKnot ss 1 #corner #line PointB
  updateShape ss
	ss
)

-- newSpline = drawLineBetweenTwoPoints [10,20,30] [100,200,10]

zZero = -1000.0
count = 100
levels = 5
circlePoints = count / levels
radius = 40
h = 50

for i=0 to count do (
	n = i + 0.0
	x0 = sin(((n - 1.0) / circlePoints) * 360) * radius
	z0 = cos(((n - 1.0) / circlePoints) * 360) * radius
	y0 = h * ((n - 1.0) / count)
	
    x = sin((n / circlePoints) * 360) * radius
	z = cos((n / circlePoints) * 360) * radius
	y = h * (n / count)
	print x
	newSpline = drawLineBetweenTwoPoints [x, z + zZero, y]  [x0, z0 + zZero, y0]
)

