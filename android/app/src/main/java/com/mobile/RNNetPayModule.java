package com.mobile;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import android.app.Activity;
import android.content.Intent;
import android.view.Gravity;

import androidx.annotation.NonNull;

import java.util.Objects;

import javax.annotation.Nullable;

import mx.com.netpay.sdk.IPage;
import mx.com.netpay.sdk.SmartApi;
import mx.com.netpay.sdk.SmartApiFactory;

import mx.com.netpay.sdk.models.*;

public class RNNetPayModule extends ReactContextBaseJavaModule {
    private SmartApi smartApi;
    private Promise mPromise;
    private ReactApplicationContext reactContext;

    public RNNetPayModule (ReactApplicationContext context){
        super(context);
        this.reactContext = context;
        ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent intent) {
                if (intent != null) {
                    BaseResponse response = null;
                    switch (requestCode) {
                        case Constants.SALE_REQUEST:
                            response = (SaleResponse) smartApi.onResult(requestCode, resultCode, intent);
                            break;

                        case Constants.CANCEL_REQUEST:
                            response = (CancelResponse) smartApi.onResult(requestCode, resultCode, intent);
                            break;

                        case Constants.REPRINT_REQUEST:
                            response = (ReprintResponse) smartApi.onResult(requestCode, resultCode, intent);

                            break;

                        case Constants.PRINT_REQUEST:
                            response = (PrintResponse) smartApi.onResult(requestCode, resultCode, intent);
                            break;
                    }
                    mPromise.resolve(response);
                }
                mPromise = null;
            }
        };
        context.addActivityEventListener(mActivityEventListener);
        
    }

    @NonNull
    @Override
    public String getName(){
        return "RNNetPay";
    }

    @ReactMethod
    public void doTrans(final Promise promise){
        this.mPromise = promise;
        double total = 50;
        double tip = 0;
        SaleRequest sale = new SaleRequest("com.mobile", total, tip, null, null, null,
                null, null, null, null, null, null, null,
                null, null);
        this.getApiInstance().doTrans(sale);
    }

    private SmartApi getApiInstance(){
        if (this.smartApi != null){
            return this.smartApi;
        }
        Activity activity = this.reactContext.getCurrentActivity();
        if (activity == null){
            throw new IllegalStateException("Not attached to an Activity");
        }
        this.smartApi = SmartApiFactory.INSTANCE.createSmartApi(activity);

        return this.smartApi;
    }
    
    @ReactMethod
    public void printTicket(final Promise promise){
        this.mPromise = promise;
        //Crear una página
        IPage page = this.getApiInstance().createPage();

        //Crear unidad qutiene texto e cony otros formatos
        IPage.ILine.IUnit unit1 = page.createUnit();
        unit1.setText("Texto 1");
        unit1.setGravity(Gravity.START);

        //Se pueden agregar 2 o más unidades a una línea y se dividirá en columnas
        IPage.ILine.IUnit unit2 = page.createUnit();
        unit2.setText("Texto 2");
        unit2.setGravity(Gravity.END);

        //Se crea una línea y se agregan sus unidades.
        page.addLine().
                addUnit(unit1).
                addUnit(unit2);

        //Se crea una nueva unidad
        IPage.ILine.IUnit unit3 = page.createUnit();
        unit3.setText("Texto 3");
        unit3.setGravity(Gravity.CENTER);

        //Se crea una nueva línea y se agrega la unidad pasada
        page.addLine().addUnit(unit3);

        //Se crea un request del tipo PrintRequest con el package name del app y la página creada
        PrintRequest printRequest = new PrintRequest("com.mobile", page);

        this.getApiInstance().doTrans(printRequest);
    }


}
