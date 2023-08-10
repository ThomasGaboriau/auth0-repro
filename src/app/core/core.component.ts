import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnInit {

    private router = inject(Router);

    public ngOnInit(): void {
        console.log(this.router.navigateByUrl ?? 'null');
    }

}
