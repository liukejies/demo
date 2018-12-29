package com.example.demo.service;



import com.example.demo.dao.QuestionDAO;
import com.example.demo.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class QuestionService {

    @Autowired
    QuestionDAO qdao;


    //添加错题
    public int questionAdd(Question q){
        return qdao.questionAdd(q);
    }

    //查询错题集
    public List<Map<String,Object>> questionQuery(){
        return qdao.questionQuery();
    }

    //错题数
    public int questionCount(){
        return qdao.questionCount();
    }

    //删除错题
    public int questionDel(Integer id){ return qdao.questionDel(id); }
}
