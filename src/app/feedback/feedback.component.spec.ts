import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback.component';
import { provideRouter, Router } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { HomeComponent } from '../home/home.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'home', component: HomeComponent }]),
        provideLocationMocks(),
      ],
      imports: [FeedbackComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  // Testi 1: Komponentin alustus
  it('1. should create component', () => {
    expect(component).toBeTruthy();
  });

  // Testi 2: cancel() -metodin reititystesti
  it('2. cancel() navigates to home', () => {
    component.cancel();
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  // Testi 3: Puhelinkentän alaraja-arvotesti (alle 10 merkkiä -> virhe)
  it('3. should mark phone field invalid when length is 9 (below minLength 10)', () => {
    const ctrl = component.phone;
    ctrl?.setValue('123456789'); // 9 merkkiä

    expect(ctrl?.hasError('minlength')).toBeTrue();
  });

  // Testi 4: Puhelinkentän hyväksytty raja-arvotesti (tasan 10 merkkiä -> kelvollinen)
  it('4. should mark phone field valid when length is 10 (exact boundary)', () => {
    const ctrl = component.phone;
    ctrl?.setValue('0401234567'); // 10 merkkiä

    expect(ctrl?.hasError('minlength')).toBeFalse();
  });

  // Testi 5: onSubmit() -metodin toiminta (nollaa lomakkeen kentät)
  it('5. onSubmit() should reset form values and clear errors', () => {
    component.fbForm.patchValue({
      title: 'Feedback Title',
      description: 'Some valid feedback text',
      name: 'Matti Meikalainen',
      email: 'matti@example.com',
      phone: '0401234567'
    });

    component.onSubmit();

    expect(component.title?.value).toBeNull();
    expect(component.phone?.value).toBeNull();
    expect(component.fbForm.valid).toBeFalse();
  });
});