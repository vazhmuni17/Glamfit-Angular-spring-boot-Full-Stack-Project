import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { BeautyServices } from './component/beauty-services/beauty-services';
import { TreatmentServices } from './component/treatment-services/treatment-services';
import { Aboutus } from './component/aboutus/aboutus';
import { Contactus } from './component/contactus/contactus';
import { BookingForm } from './component/shared/booking-form/booking-form';
import { Gallery } from './component/gallery/gallery';
import { Packages } from './component/packages/packages';
import { AddCarts } from './component/add-carts/add-carts';
import { LoginComponent } from './component/admin/login/login';
import { LayoutComponent } from './component/admin/layout/layout';
import { DashboardComponent } from './component/admin/dashboard/dashboard';
import { UsersComponent } from './component/admin/users/users';
import { ProductsComponent } from './component/admin/products/products';
import { OrdersComponent } from './component/admin/orders/orders';
import { ReportsComponent } from './component/admin/reports/reports';
import { SettingsComponent } from './component/admin/settings/settings';
import { GalleryAdminComponent } from './component/admin/gallery/gallery';
import { Highlights } from './component/admin/highlights/highlights';
import { LoginComponent as ManagerLoginComponent } from './component/manager/login/login';
import { LayoutComponent as ManagerLayoutComponent } from './component/manager/layout/layout';
import { DashboardComponent as ManagerDashboardComponent } from './component/manager/dashboard/dashboard';
import { UsersComponent as ManagerUsersComponent } from './component/manager/users/users';
import { ProductsComponent as ManagerProductsComponent } from './component/manager/products/products';
import { OrdersComponent as ManagerOrdersComponent } from './component/manager/orders/orders';
import { ReportsComponent as ManagerReportsComponent } from './component/manager/reports/reports';
import { SettingsComponent as ManagerSettingsComponent } from './component/manager/settings/settings';
import { GalleryAdminComponent as ManagerGalleryComponent } from './component/manager/gallery/gallery';
import { Highlights as ManagerHighlights } from './component/manager/highlights/highlights';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'beauty-services',component:BeautyServices},
    {path:'treatment-services',component:TreatmentServices},
    {path:'gallery',component:Gallery},
    {path:'packages',component:Packages},
    {path:'aboutus',component:Aboutus},
    {path:'contactus',component:Contactus},
    {path:'booking',component:BookingForm},
    {path:'cart',component:AddCarts},
    
    // Admin Routes
    {path: 'admin/login', component: LoginComponent},
    {
        path: 'admin', 
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'users', component: UsersComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'reports', component: ReportsComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'gallery', component: GalleryAdminComponent},
            {path: 'highlights', component: Highlights},
        ]
    },
    // Manager Routes
    {path: 'manager/login', component: ManagerLoginComponent},
    {
        path: 'manager', 
        component: ManagerLayoutComponent,
        canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: ManagerDashboardComponent},
            {path: 'users', component: ManagerUsersComponent},
            {path: 'products', component: ManagerProductsComponent},
            {path: 'orders', component: ManagerOrdersComponent},
            {path: 'reports', component: ManagerReportsComponent},
            {path: 'settings', component: ManagerSettingsComponent},
            {path: 'gallery', component: ManagerGalleryComponent},
            {path: 'highlights', component: ManagerHighlights},
        ]
    }
];
