package app.ohtannenbaum;


import android.os.Bundle;
import com.phonegap.*;


public class OhtannenbaumActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/mobile/index.html");
    }
}