package io.scrollback.neighborhoods.modules.facebook;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class FacebookLoginPackage implements ReactPackage {

    private Activity mCurrentActivity;
    private FacebookLoginModule mModuleInstance;

    public FacebookLoginPackage(Activity activity) {
        mCurrentActivity = activity;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        mModuleInstance = new FacebookLoginModule(reactContext, mCurrentActivity);

        return Arrays.<NativeModule>asList(mModuleInstance);
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public boolean handleActivityResult(final int requestCode, final int resultCode, final Intent data) {
        if (mModuleInstance == null) {
            return false;
        }

        return mModuleInstance.handleActivityResult(requestCode, resultCode, data);
    }
}
