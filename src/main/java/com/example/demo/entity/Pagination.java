package com.example.demo.entity;

import java.util.List;

public class Pagination {

	private Long total;// 总行数
	private List rows;

	public Pagination(Long total, List rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

	@Override
	public String toString() {
		return "Pagination [total=" + total + ", rows=" + rows + "]";
	}
	
	

}
