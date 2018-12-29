package com.example.demo.dao;

import com.example.demo.entity.Question;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface QuestionDAO {

    //添加错题集
    @Insert("insert into question values(#{id},#{question},#{answer},#{item1},#{item2}," +
            " #{item3},#{item4},#{explains},#{url})")
    public int questionAdd(Question q);

    //查询错题集
    @Select("select id,question,answer,item1,item2,item3,item4,explains,url from question")
    public List<Map<String,Object>> questionQuery();

    //错题总数
    @Select("select count(*) from question")
    public int questionCount();

    //删除错题
    @Delete("delete from question where id=#{id}")
    public int questionDel(Integer id);

}
