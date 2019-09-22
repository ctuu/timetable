import {
    trigger,
    query,
    style,
    animate,
    transition,
    animateChild,
    group
    // ...
} from '@angular/animations';
const aniToRight = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',

        })
    ]),
    query(':leave', animateChild()),
    query(':enter', animateChild()),
    query(':enter', [
        style({ right: '-100%' })
    ]),
    group([
        query(':leave', [
            animate('200ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
            animate('200ms ease-out', style({ right: '0%' }))
        ])
    ]),

]
const aniToLeft = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
        })
    ]),
    query(':enter', [
        style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))
        ])
    ]),
    query(':enter', animateChild()),
];
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('view => com', aniToRight),
        transition('com => edit', aniToRight),
        transition('edit => com', aniToLeft),
        transition('com => view', aniToLeft)
    ]);


export const fabAnimation = trigger('fabAni', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
    ])
]);

export const drawerAnimation =
    trigger('drawAni', [
        transition('hidden => visible', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.2s cubic-bezier(.4,0,.2,1)', style({
                transform: 'none'
            })),
        ]),
        transition('visible => hidden', [
            style({ transform: 'translateX(0%)' }),
            animate('0.2s cubic-bezier(.4,0,.2,1)', style({ transform: 'translateX(-100%)' }))
        ])
    ]);