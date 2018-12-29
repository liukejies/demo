package com.example.demo.controller;


import com.example.demo.entity.Question;
import com.example.demo.service.QuestionService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/test")
public class Demo {
    String key="3ee0604ffa403e6a078b7e18363ffdf1";//老付key值
    //String key="802774696459caac7cecc39c931fabdf";//彭坤key值
    //String key="19c7a515a19c4b48a3d00ec926c41ada";//我的key值

    @Resource
    QuestionService service;

    @RequestMapping("t")
    public String t(){
        return "Reception/examination";
    }

    /**
     * 查询题库传输数据方法
     * @param subject
     * @param model
     * @param testType
     * @param models
     * @return
     */
    @RequestMapping("test")
    public String main(String subject, String model, String testType, Model models) {
        String url = "http://v.juhe.cn/jztk/query?subject="+subject+"&model="+model+"&testType="+testType+"&key="+key;
        String json = loadJSON(url);
        JSONObject js = JSONObject.fromObject(json);
        JSONArray results = js.getJSONArray("result");
        models.addAttribute("jsonsr", results.get(0));
        models.addAttribute("testType",testType);
        models.addAttribute("qcount",results.size());
        return "Reception/examination";
    }

    /**
     * 点几下一题查询方法
     * @param index
     * @param subject
     * @param model
     * @param testType
     * @return
     */
    @RequestMapping("xia")
    @ResponseBody
    public String xia(int index,String subject, String model, String testType) {
        String url = "http://v.juhe.cn/jztk/query?subject="+subject+"&model="+model+"&testType="+testType+"&key="+key;
        String json = loadJSON(url);
        JSONObject js = JSONObject.fromObject(json);
        JSONArray results = js.getJSONArray("result");
        return results.get(index).toString();
    }

    @RequestMapping("shang")
    @ResponseBody
    public String shang() {
        return "1";
    }

    @RequestMapping("xias")
    @ResponseBody
    public String xias() {
        return "1";
    }

    /**
     * 添加到错题集
     * @param cid
     * @param cquestion
     * @param canswer
     * @param citem1
     * @param citem2
     * @param citem3
     * @param citem4
     * @param cexplanis
     * @param curl
     * @return
     */
    @RequestMapping("cuo")
    @ResponseBody
    public String cuo(Integer cid,String cquestion,String canswer,
                      String citem1,String citem2,String citem3,
                      String citem4,String cexplanis,String curl){

        Question q = new Question(cid, cquestion, canswer, citem1, citem2,
                                  citem3, citem4, cexplanis, curl);
        service.questionAdd(q);
        return "1";
    }

    /**
     * 错题查询
     * @param m
     * @return
     */
    @RequestMapping("questionQuery")
    public String questionQuery(Model m){
        List<Map<String, Object>> cquery = service.questionQuery();
        int count = service.questionCount();
        if(cquery.size()>0){
            m.addAttribute("cquery",cquery.get(0));
            m.addAttribute("count",count);
            return "Reception/cexamination";
        }else{
            return "index";
        }

    }

    /**
     * 错题下一题
     * @param index
     * @param m
     * @return
     */
    @RequestMapping("cxia")
    @ResponseBody
    public String cxia(Integer index,Model m){
        List<Map<String, Object>> cquery = service.questionQuery();
        String count = String.valueOf(service.questionCount());
        //m.addAttribute("cquery",cquery.get(index));
        //m.addAttribute("count",count);
        JSONObject jsonObject = JSONObject.fromObject(cquery.get(index));
        return jsonObject.toString();
    }

    /**
     * 错题上一题
     * @param index
     * @param m
     * @return
     */
    @RequestMapping("cshang")
    @ResponseBody
    public String cshang(Integer index,Model m){
        List<Map<String, Object>> cquery = service.questionQuery();
        String count = String.valueOf(service.questionCount());
        //m.addAttribute("cquery",cquery.get(index));
        //m.addAttribute("count",count);
        JSONObject jsonObject = JSONObject.fromObject(cquery.get(index-2));
        return jsonObject.toString();
    }

    @RequestMapping("cdel")
    @ResponseBody
    public String cdel(Integer cids){
        service.questionDel(cids);
        return "1";
    }

    public static String loadJSON (String url) {
        StringBuilder json = new StringBuilder();
        try {
            URL oracle = new URL(url);
            URLConnection yc = oracle.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    yc.getInputStream()));
            String inputLine = null;
            while ( (inputLine = in.readLine()) != null) {
                json.append(inputLine);
            }
            in.close();
        } catch (MalformedURLException e) {
        } catch (IOException e) {
        }
        return json.toString();
    }
}
