function generatePhylloPoints(numPoints, scale, width, height) {
    const points = []
    for (var i = 0; i < numPoints; i++) {
        const angle = i * 137.5;
        const radius = scale * sqrt(i);

        points.push({x: radius * cos(angle) + width / 2, y: radius * sin(angle) + height / 2});
    }
    return points;
}