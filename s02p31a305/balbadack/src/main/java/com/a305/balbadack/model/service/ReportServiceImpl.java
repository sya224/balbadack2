package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Report;
import com.a305.balbadack.repository.ReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    ReportRepository reportRepository;

	@Override
    public void insert(Report report) {
        try {
            reportRepository.save(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public List<Report> findByU_id(String u_id) {
        try {
            return reportRepository.findByUser(u_id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Report> findByR_code(int r_code) {
        try {
            return reportRepository.findByReview(r_code);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public void delete(Report report) {
        try {
            reportRepository.delete(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(int re_code) {
        try {
            reportRepository.reportDelete(re_code);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Report> findAll() {
        try {
            return reportRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
}