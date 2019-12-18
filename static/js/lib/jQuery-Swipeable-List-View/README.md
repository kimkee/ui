# jQuery List Swipe

Allows a "swipe layout" in lists, allowing buttons to be accessible on swipe.

This doesn't copy exactly how it works in Android apps like GMail where the swiping triggers the action. This instead shows a button on either side of a list item.

## Default Options
```javascript
{
	itemSelector: '>', //The item in the list that has the side actions
	itemActionWidth: 80, //In pixels
	leftAction: true, //Whether there is an action on the left
	rightAction: true, //Whether there is an action on the right
	snapThreshold: 0.8, //Percent threshold for snapping to position on touch end
	snapDuration: 200, //Snap animation duration
	closeOnOpen: true, //Close other item actions if a new one is moved
	maxYDelta: 40, //Number of pixels in the Y-axis before preventing swiping
	initialXDelta: 25 //Number of pixels in the X-axis before allowing swiping
}
```
