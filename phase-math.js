export function normalizedAngle(angle){return ((angle%360)+360)%360}
export function illumination(angle){return (1-Math.cos(normalizedAngle(angle)*Math.PI/180))/2}
export function phaseName(angle){const a=normalizedAngle(angle);return a<.5||a>359.5?'新月':Math.abs(a-90)<.5?'上弦月':Math.abs(a-180)<.5?'滿月':Math.abs(a-270)<.5?'下弦月':a<90?'眉月':a<180?'盈凸月':a<270?'虧凸月':'殘月'}
export function lockedRotation(angle){return normalizedAngle(angle)*Math.PI/180+Math.PI}
