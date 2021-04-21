package com.weatherapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class NotificationModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "NotificationService";
    private static ReactApplicationContext reactContext;

    public NotificationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService(String iconName,String Temp) {
        Intent serviceIntent = new Intent(this.reactContext, NotificationService.class);
        serviceIntent.putExtra("iconName", iconName);
        serviceIntent.putExtra("temp", Temp);
        this.reactContext.startService(serviceIntent);
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, NotificationService.class));
    }
}

