package com.gemantic.killer.service.compare;

import java.util.Comparator;

import com.gemantic.killer.model.Record;

public class RecordCompare implements Comparator {

	@Override
	public int compare(Object o1, Object o2) {
		int i = 0;
		Record c1 = (Record) o1;
		Record c2 = (Record) o2;
		Long time1 = c1.getCreateAt();
		Long time2 = c2.getCreateAt();
		if(time1>time2){
			i=-1;
		}else{
			if(time1.longValue()==time2.longValue()){
				i=0;
			}else{
				i=1;
			}
		}
		
		

		return i;
	}

}
