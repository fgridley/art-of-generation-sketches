let points = [];
let polygons = [];

function setup() {
    createCanvas(800,800);
    noFill();
    strokeWeight(5);

    points = generateRings(8, width/2, height/2);
    polygons = generateVoronoi(points, 0);
    
    // drawPoints(points, 'black');
    drawPolygons(polygons, 'black');
}

function draw() {

}

function createRing(numPoints, radius, xOffset, yOffset) {
    const ringPoints = [];
    const angle = 360 / numPoints;
    const randOffset = random(360);

    for (let i = 0; i < numPoints; i++) {
        const curAngle = randOffset + angle * i;
        const x = radius * Math.cos(radians(curAngle)) + xOffset
        const y = radius * Math.sin(radians(curAngle)) + yOffset
        ringPoints.push({x: x, y: y});
    }

    return ringPoints;
}

function generateRings(rings, xOffset, yOffset) {
    let ringPoints = []
    let radii = []
    for (let i = 0; i < rings; i++) {
        let radiusTooClose = false;
        const radius = round(random(width/2));
        radii.forEach((radius1) => {
            if (radius > radius1 - 5 && radius < radius1 + 5) {
                radiusTooClose = true;
            }
        })
        if (!radiusTooClose) {
            radii.push(radius);
            const numPoints = round(random(3, 30));
            ringPoints = ringPoints.concat(createRing(numPoints, radius, xOffset, yOffset))
        }
    }
    return ringPoints;
}