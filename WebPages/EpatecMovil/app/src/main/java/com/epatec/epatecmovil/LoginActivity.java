package com.epatec.epatecmovil;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class LoginActivity extends ActionBarActivity {

    String userNickname = "";
    String userPassword = "";

    AsyncTaskConnector connector;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);



        final EditText pUser = (EditText)findViewById(R.id.pUser);
        final EditText pPassword   = (EditText)findViewById(R.id.pPass);


        final Button loginButton = (Button) findViewById(R.id.loginButton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                userNickname = pUser.getText().toString();
                userPassword = pPassword.getText().toString();

                connector = new AsyncTaskConnector();
                connector.execute("init");

                requestLogin(pUser.getText().toString(), pPassword.getText().toString());
            }
        });
    }

    private void requestLogin(String pUser, String pPassword){


    }

    private class AsyncTaskConnector extends AsyncTask<String, String, String> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }
        @Override
        protected String doInBackground(String... params) {
            /*******************/
            OutputStream os = null;
            InputStream is = null;
            HttpURLConnection conn = null;
            String message = "";

            try {
                //constants
                URL url = new URL("http://cewebserver.azurewebsites.net/Service1.svc/postlogin");
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("Nickname", userNickname);
                    jsonObject.put("Secure_Pass", userPassword);
                    message = jsonObject.toString();
                } catch (JSONException e) {
                    e.printStackTrace();
                }


                conn = (HttpURLConnection) url.openConnection();
                conn.setReadTimeout(10000 /*milliseconds*/);
                conn.setConnectTimeout(15000 /* milliseconds */);
                conn.setRequestMethod("POST");
                conn.setDoInput(true);
                conn.setDoOutput(true);
                conn.setFixedLengthStreamingMode(message.getBytes().length);

                //make some HTTP header nicety
                conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
                conn.setRequestProperty("X-Requested-With", "XMLHttpRequest");

                //open
                conn.connect();

                //setup send
                os = new BufferedOutputStream(conn.getOutputStream());
                os.write(message.getBytes());
                //clean up
                os.flush();

                //do somehting with response
                is = conn.getInputStream();

                StringBuffer response;


                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();


                publishProgress(response.toString());





            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                //clean up
                try {
                    os.close();
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                conn.disconnect();
            }

            return "";
        }
        @Override
        protected void onProgressUpdate(String... progress) {

            String response = progress[0].split("\"")[1];
            if(response.compareTo("responsetrue") == 0 ) {

                new SweetAlertDialog(LoginActivity.this, SweetAlertDialog.SUCCESS_TYPE)
                        .setTitleText("Bienvenido")
                        .setContentText("Iniciando sesión...")
                        .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                sDialog.dismissWithAnimation();
                                UserDataHolder x = UserDataHolder.getInstance();
                                x.user = userNickname;
                                LoginActivity.this.finish();
                            }
                        })
                        .show();
            }
            else if(response.compareTo("responsefalse") == 0 ){
                new SweetAlertDialog(LoginActivity.this, SweetAlertDialog.ERROR_TYPE)
                        .setTitleText("Oops")
                        .setContentText("Usuario o contraseña incorrectos")
                        .show();
            }

        }
        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
        }
    }

}
